package com.edu.virtusa.main.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edu.virtusa.main.message.Response;
import com.edu.virtusa.main.model.Member;
import com.edu.virtusa.main.model.MemberRepository;

@Service
public class MemberService {

	@Autowired
	MemberRepository memberRepository;
	
	public Response saveMember(Member member) {
		Member save = memberRepository.save(member);
		return new Response("Done",save);
	}
	public List<Member> getAllMembers() {
		List<Member> findAll = memberRepository.findAll();
		return findAll;
	}
	
	public String deleteMember(String id) {
		Optional<Member> findById = memberRepository.findById(id);
		Member member2 = findById.get();
		memberRepository.delete(member2);
		return "OK!";
//		 List<Member> allMembers = getAllMembers();
//		 for (Member member : allMembers) {
//			 if(member.getId().equals(id)) {
//				 memberRepository.delete(entity);
//			 }
//		}
		 
		
	}
}
