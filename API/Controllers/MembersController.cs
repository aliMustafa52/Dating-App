using API.Data;
using API.Dtos;
using API.Entities;
using API.Extensions;
using API.interfaces;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class MembersController(IMemberRepository memberRepository) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<MemberDto>>> GetMembers()
        {
            var members = await memberRepository.GetMembersAsync();

            var membersDto = members.Select(m => m.ToDto()).ToList();

            return Ok(membersDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MemberDto>> GetMember(string id)
        {
            var Member = await memberRepository.GetMemberByIdAsync(id);

            return Member is null
                ? NotFound()
                : Ok(Member.ToDto());
        }

        [HttpPut]
        public async Task<ActionResult<MemberDto>> UpdateMember([FromBody] UpdateMemberDto updateMemberDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var member = await memberRepository.GetMemberByIdAsync(userId);
            if (member is null) return NotFound();

            member.DisplayName = updateMemberDto.DisplayName;
            member.Description = updateMemberDto.Description;
            member.City = updateMemberDto.City;
            member.Country = updateMemberDto.Country;
            member.LastActive = DateTime.UtcNow;
            member.AppUser.DisplayName = updateMemberDto.DisplayName;

            memberRepository.update(member);

            if (await memberRepository.SaveAllAsync())
            {
                return Ok(member.ToDto());
            }

            return BadRequest("Failed to update profile");
        }

        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<PhotoDto>>> GetMemberPhotos(string id)
        {
            var photos = await memberRepository.GetPhotosForMemberAsync(id);

            var photosDto = photos.Select(p => p.ToDto()).ToList();

            return Ok(photosDto);
        }
    }
}
