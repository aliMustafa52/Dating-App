using API.Data;
using API.Dtos;
using API.Entities;
using API.Extensions;
using API.interfaces;
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

        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<PhotoDto>>> GetMemberPhotos(string id)
        {
            var photos = await memberRepository.GetPhotosForMemberAsync(id);

            var photosDto = photos.Select(p => p.ToDto()).ToList();

            return Ok(photosDto);
        }
    }
}
