package com.cavitestate.farmlab.service;

import com.cavitestate.farmlab.dto.CategorySoldDto;
import com.cavitestate.farmlab.model.Category;
import com.cavitestate.farmlab.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public Optional<Category> getCategoryById(String id) {
        return categoryRepository.findById(id);
    }

    public List<CategorySoldDto> getTopCategoriesBySold() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group("category").sum("sold").as("totalSold"),
                Aggregation.sort(Sort.Direction.DESC, "totalSold"),
                Aggregation.limit(5),
                Aggregation.project("category", "totalSold").andExclude("_id")
        );
        AggregationResults<CategorySoldDto> results = mongoTemplate.aggregate(aggregation, "products", CategorySoldDto.class);
        return results.getMappedResults();
    }

    public void deleteCategory(String categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    public void updateCategory(String id, Category category) {
        Category setCategory = categoryRepository.findById(id).orElse(null);
        if (setCategory != null) {
            setCategory.setCategoryName(category.getCategoryName());
            setCategory.setImageUrl(category.getImageUrl());
            categoryRepository.save(setCategory);
        }
    }

}
