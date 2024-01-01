package com.cavitestate.farmlab.controller;

import com.cavitestate.farmlab.model.Favorite;
import com.cavitestate.farmlab.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorite")
@CrossOrigin("*")
public class FavoriteController {

    @Autowired
    FavoriteService favoriteService;


    @PostMapping("/create")
    public ResponseEntity<?> createFavorite(@RequestBody Favorite favorite) {
        Favorite createFavorite = favoriteService.addFavorite(favorite);
        if (createFavorite != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createFavorite);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error adding favorite");
        }
    }

//    @GetMapping("/product/{email}")
//    public ResponseEntity<List<Product>> getSpecificFavProductByEmail(@PathVariable String email) {
//        List<Product> favoriteServiceSpecificFavProductByEmail = favoriteService.getSpecificFavProductByEmail(email);
//        return ResponseEntity.ok(favoriteServiceSpecificFavProductByEmail);
//    }

    @GetMapping("/isFavorite/{email}/{productId}")
    public boolean isFavorite(@PathVariable String email, @PathVariable String productId) {
        return favoriteService.isFavorite(email, productId);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Favorite> deleteWishlist(@PathVariable String id) {
        Favorite deleteFavoriteList = favoriteService.deleteFavoriteList(id);
        return ResponseEntity.ok(deleteFavoriteList);
    }

    @GetMapping("/{email}")
    ResponseEntity<List<Favorite>> getFavoriteByEmail(@PathVariable String email) {
        List<Favorite> favoriteList = favoriteService.getFavoriteByEmail(email);
        return ResponseEntity.ok(favoriteList);
    }

}
