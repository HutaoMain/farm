package com.cavitestate.farmlab.controller;

import com.cavitestate.farmlab.dto.ProductDto;
import com.cavitestate.farmlab.model.Category;
import com.cavitestate.farmlab.model.Product;
import com.cavitestate.farmlab.repository.CategoryRepository;
import com.cavitestate.farmlab.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/product")
@CrossOrigin("*")
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    CategoryRepository categoryRepository;

    @PostMapping("/create")
    public ResponseEntity<String> createProduct(@RequestBody Product product) {
//        Optional<Category> optionalCategories = categoryRepository.findById(product.getCategoryId());
//        if (optionalCategories.isEmpty()) {
//            return ResponseEntity.ok("category does not exist");
//        } else {
//            productService.createProduct(product, optionalCategories.get());
//            return ResponseEntity.ok("success created product");
//        }
        productService.createProduct(product);
        return ResponseEntity.ok("success created product");
    }

    @GetMapping("/withCategory/{category}")
    List<Product> getProductWithSpecificCategory(@PathVariable String category) {
        return productService.getProductsByCategory(category);
    }

    @GetMapping("/list")
    List<Product> getAllProducts(@RequestParam(name = "category", required = false) String category) {
        if (category != null) {
            return productService.getProductsByCategory(category);
        } else {
            return productService.getAllProducts();
        }
    }

    @GetMapping("/bestProducts")
    List<Product> getBest4Products() {
        return productService.getTopSoldProducts();
    }

    @GetMapping("/favoriteByEmail/{email}")
    ResponseEntity<List<Optional<Product>>> getProductsByFavoriteFindByEmail(@PathVariable String email) {
        List<Optional<Product>> productListFavoriteFindByEmail = productService.getProductsByFavoriteFindByEmail(email);
        return ResponseEntity.ok(productListFavoriteFindByEmail);
    }

    @GetMapping("/specificProduct/{id}")
    ResponseEntity<Optional<Product>> getProductById(@PathVariable String id) {
        Optional<Product> optionalProduct = productService.getProductById(id);
        return ResponseEntity.ok(optionalProduct);
    }

    @DeleteMapping("/delete/{productId}")
    private String deleteProductById(@PathVariable("productId") String productId) {
        productService.deleteProductById(productId);
        return "product deleted";
    }

    @PutMapping("/update/{id}")
    private ResponseEntity<Product> updateProduct(@PathVariable String id, @RequestBody Product product) {
        Product products = productService.updateProduct(id, product);
        return ResponseEntity.ok(products);
    }

    @PutMapping("/reason/{id}")
    private ResponseEntity<Product> updatePutReason(@PathVariable String id, @RequestBody Product product) {
        Product products = productService.updatePutReason(id, product);
        return ResponseEntity.ok(products);
    }
}
