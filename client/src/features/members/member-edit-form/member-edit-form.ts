import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Member, UpdateMember } from '../../../core/models/member';

@Component({
  selector: 'app-member-edit-form',
  imports: [ReactiveFormsModule],
  templateUrl: './member-edit-form.html',
})
export class MemberEditForm {
  private formBuilder = inject(FormBuilder);

  member = input.required<Member>();
  isSaving = input(false);

  save = output<UpdateMember>();
  cancel = output<void>();

  profileForm = this.formBuilder.nonNullable.group({
    displayName: ['', [Validators.required, Validators.maxLength(100)]],
    description: [''],
    city: ['', [Validators.required, Validators.maxLength(100)]],
    country: ['', [Validators.required, Validators.maxLength(100)]],
  });

  constructor() {
    effect(() => {
      this.patchForm(this.member());
    });
  }

  onSubmit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const formValue = this.profileForm.getRawValue();
    const description = formValue.description.trim();

    const payload: UpdateMember = {
      displayName: formValue.displayName.trim(),
      description: description || null,
      city: formValue.city.trim(),
      country: formValue.country.trim(),
    };

    this.save.emit(payload);
  }

  onCancel() {
    this.patchForm(this.member());
    this.cancel.emit();
  }

  private patchForm(member: Member) {
    this.profileForm.patchValue({
      displayName: member.displayName,
      description: member.description ?? '',
      city: member.city,
      country: member.country,
    });

    this.profileForm.markAsPristine();
    this.profileForm.markAsUntouched();
  }
}
