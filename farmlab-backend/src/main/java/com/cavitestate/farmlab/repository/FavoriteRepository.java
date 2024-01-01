package com.cavitestate.farmlab.repository;

import com.cavitestate.farmlab.model.Favorite;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FavoriteRepository extends MongoRepository<Favorite, String> {

    List<Favorite> findByEmail(String email);

    void deleteByProductId(String productId);

    Favorite findByEmailAndProductId(String email, String productId);
}
