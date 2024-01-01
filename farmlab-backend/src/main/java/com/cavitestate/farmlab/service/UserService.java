package com.cavitestate.farmlab.service;

import com.cavitestate.farmlab.model.User;
import com.cavitestate.farmlab.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User registerUser(User user) {
        User userByEmail = userRepository.findByEmail(user.getEmail());
        if(userByEmail != null){
            System.out.print("Username is already existing");
            return null;
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
        String encodedPassword = encoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepository.save(user);
    }

    public User loginUser(String email, String password) throws Exception {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new Exception("User not found");
        }
        if (!encoder.matches(password, user.getPassword())) {
            throw new Exception("Invalid password");
        }
        return user;
    }


    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> getListUser() {
        return userRepository.findAll();
    }

    public User updateUserRole(String id, User user){
        User setUser = userRepository.findById(id).orElse(null);
        if(setUser != null){
            setUser.setUserRole(user.getUserRole());
            userRepository.save(setUser);
        }
        return setUser;
    }

    public User updateShippingAddress(String email, User user) {
        User setUser = userRepository.findByEmail(email);
        setUser.setStreet(user.getStreet());
        setUser.setBarangay(user.getBarangay());
        setUser.setPostalCode(user.getPostalCode());
        setUser.setMunicipality(user.getMunicipality());
        setUser.setCity(user.getCity());
        setUser.setContactNumber(user.getContactNumber());
        return userRepository.save(setUser);
    }
}
