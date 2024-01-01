package com.cavitestate.farmlab.service;

import com.cavitestate.farmlab.model.Category;
import com.cavitestate.farmlab.model.Favorite;
import com.cavitestate.farmlab.model.Product;
import com.cavitestate.farmlab.repository.FavoriteRepository;
import com.cavitestate.farmlab.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    FavoriteRepository favoriteRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategory(category);
    }

    public void createProduct(Product product) {
        productRepository.save(product);
    }

    public List<Product> getTopSoldProducts() {
        Sort sort = Sort.by(Sort.Direction.DESC, "sold"); // Sort by number of sales in descending order
        Pageable pageable = PageRequest.of(0, 4, sort); // Retrieve the first 4 records
        return productRepository.findAll(pageable).getContent();
    }

    public List<Optional<Product>> getProductsByFavoriteFindByEmail(String email) {
        List<Favorite> favorites = favoriteRepository.findByEmail(email);
        List<Optional<Product>> favoriteProducts = new ArrayList<>();
        for (Favorite favorite : favorites) {
            Optional<Product> product = productRepository.findById(favorite.getProductId());
            if (product.isPresent()) {
                favoriteProducts.add(product);
            }
        }
        return favoriteProducts;
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public void deleteProductById(String productId) {
        productRepository.deleteById(productId);
    }

    public Product updateProduct(String id, Product product) {
        Product setProduct = productRepository.findById(id).orElse(null);

        assert setProduct != null;

        if (product.getProductName() != null && !product.getProductName().isEmpty()) {
            setProduct.setProductName(product.getProductName());
        }
        if (product.getProductImage() != null && !product.getProductImage().isEmpty()) {
            setProduct.setProductImage(product.getProductImage());
        }
        if (product.getDescription() != null && !product.getDescription().isEmpty()) {
            setProduct.setDescription(product.getDescription());
        }
        if (product.getPrice() != null) {
            setProduct.setPrice(product.getPrice());
        }
        if (product.getQuantity() != null) {
            setProduct.setQuantity(product.getQuantity());
        }
        if (product.getCategory() != null && !product.getCategory().isEmpty()) {
            setProduct.setCategory(product.getCategory());
        }

        if (product.getReason() != null && !product.getReason().isEmpty()) {
            setProduct.setReason(product.getReason());
        }

        productRepository.save(setProduct);

        return setProduct;
    }

    public Product updatePutReason(String id, Product product) {
        Product setProduct = productRepository.findById(id).orElse(null);
        if (setProduct != null) {
            setProduct.setReason(product.getReason());
            productRepository.save(setProduct);
        }
        return setProduct;
    }
}
