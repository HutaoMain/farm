package com.cavitestate.farmlab.service;

import com.cavitestate.farmlab.model.Favorite;
import com.cavitestate.farmlab.repository.FavoriteRepository;
import com.cavitestate.farmlab.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FavoriteService {

    @Autowired
    FavoriteRepository favoriteRepository;

    @Autowired
    ProductRepository productRepository;

    public Favorite addFavorite(Favorite favorite) {
        return favoriteRepository.save(favorite);
    }

//    public List<Product> getSpecificFavProductByEmail(String email) {
//        List<Favorite> favorite = favoriteRepository.findByEmail(email);
//        List<Product> productList = new ArrayList<>();
//
//        for (Favorite w : favorite) {
//            Optional<Product> product = productRepository.findById(w.getProductId());
//            product.ifPresent(productList::add);
//        }
//
//        return productList;
//    }

    public Boolean isFavorite(String email, String productId) {
        Favorite favorite = favoriteRepository.findByEmailAndProductId(email, productId);
        return favorite != null;
    }

    @Transactional
    public Favorite deleteFavoriteList(String id) {
        favoriteRepository.deleteByProductId(id);
        return null;
    }

    public List<Favorite> getFavoriteByEmail(String email) {
        return favoriteRepository.findByEmail(email);
    }

}
