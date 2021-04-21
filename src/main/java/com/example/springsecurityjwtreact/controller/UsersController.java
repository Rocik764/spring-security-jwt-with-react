package com.example.springsecurityjwtreact.controller;

import com.example.springsecurityjwtreact.model.AuthRequest;
import com.example.springsecurityjwtreact.model.AuthResponse;
import com.example.springsecurityjwtreact.model.User;
import com.example.springsecurityjwtreact.service.CustomUserDetailsService;
import com.example.springsecurityjwtreact.service.UserService;
import com.example.springsecurityjwtreact.user_details.CustomUserDetails;
import com.example.springsecurityjwtreact.util.JwtUtil;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequestMapping("api")
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UsersController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtUtil jwtUtil;

    public UsersController(UserService userService,
                           AuthenticationManager authenticationManager,
                           CustomUserDetailsService customUserDetailsService,
                           JwtUtil jwtUtil) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.customUserDetailsService = customUserDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @RequestMapping("index")
    public String firstPage() {
        return "Home page";
    }

    @GetMapping("users")
    public List<User> all() {
        return userService.listAll();
    }

    @GetMapping("profile")
    public User profile(@RequestParam("id") Long id) {
        return userService.get(id);
    }

    @PostMapping("register")
    public ResponseEntity<?> register(@RequestBody User user) {

        try {
            userService.save(user);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest()
                    .body("User already exists");
        }

        return ResponseEntity.ok()
                .body("Registered!");
    }

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public ResponseEntity<?> authenticate(@RequestBody AuthRequest authRequest) throws Exception {

        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.badRequest()
                    .body("Bad credentials");
        }

        final CustomUserDetails userDetails = customUserDetailsService.loadUserByUsername(authRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(jwt, userDetails.getUser()));
    }
}
