package com.edu.virtusa.main.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.edu.virtusa.main.message.Response;
import com.edu.virtusa.main.model.Member;
import com.edu.virtusa.main.service.MemberService;


@RestController
@RequestMapping("/api/member")
public class RestMemberController {
	
	@Autowired
	MemberService memberService;
	
	@PostMapping(value = "/save")
	public Response postCustomer(@RequestBody Member member) {
		Response saveMember = memberService.saveMember(member);
		return saveMember; 
	}
	@GetMapping(value = "/all")
	public List<Member> getResource() {
		return memberService.getAllMembers();
	}
	@DeleteMapping(value = "/delete/{id}")
	public String deleteCustomer(@PathVariable String id) {	
		return memberService.deleteMember(id);
	}
}
