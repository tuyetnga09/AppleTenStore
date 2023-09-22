package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.repository.CategoryRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Category;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Date;
import java.util.List;


@Service
public class CategoryServiceImpl implements Iservice<Category> {
    @Autowired
    private CategoryRepository  categoryRepository;

    @Override
    public Page<Category> getAll(Pageable pageable) {
       return categoryRepository.findAll(pageable);
    }

    public List<Category> getAll() {
        return categoryRepository.getAll();
    }
    @Override
    public void insert(Category category) {
        categoryRepository.save(category);
    }

    @Override
    public void update(Category category, Integer id) {
        categoryRepository.save(category);
    }

    @Override
    public void delete(Integer id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public void delete(Category category) {
        category.setStatus(1);
        categoryRepository.save(category);
    }

    @Override
    public void returnDelete(Category category) {
        category.setStatus(0);
        categoryRepository.save(category);
    }

    public Category getOne(Integer id) {
        return categoryRepository.findById(id).get();
    }
    public Page<Category> getDelete(Pageable pageable) {
        return categoryRepository.deleteCategory(pageable);
    }

    public void importDataFromExcel(MultipartFile file) throws Exception{
        InputStream inputStream = file.getInputStream();
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0); // dữ liệu lấy ở sheet đầu tiên

        for (Row row: sheet){
            if(row.getRowNum() == 0){
                continue;
            }

            String code = row.getCell(0).getStringCellValue();
            Category existingCategory = categoryRepository.findByCode(code);

            if(existingCategory != null){
                //Đã tồn tại
                existingCategory.setName(row.getCell(1).getStringCellValue());
                existingCategory.setDateUpdate(new Date());
                existingCategory.setPersonUpdate(row.getCell(3).getStringCellValue());
                categoryRepository.save(existingCategory);
            }else {
                //Chưa tồn tại thêm mới
                Category newCategory = new Category();
                newCategory.setCode(code);
                newCategory.setName(row.getCell(1).getStringCellValue());
                newCategory.setDateCreate(new Date());
                newCategory.setDateUpdate(new Date());
                newCategory.setPersonCreate(row.getCell(2).getStringCellValue());
                newCategory.setPersonUpdate(row.getCell(3).getStringCellValue());
                newCategory.setStatus(0);
                categoryRepository.save(newCategory);
            }
        }

        workbook.close();
    }

    public Page<Category> search(String search,Pageable pageable) {
        return categoryRepository.search(search ,pageable);
    }

}
