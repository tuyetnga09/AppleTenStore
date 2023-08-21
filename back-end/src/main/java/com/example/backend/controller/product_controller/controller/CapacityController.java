package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.service.impl.CapacityServiceImpl;
import com.example.backend.controller.product_controller.service.impl.CategoryServiceImpl;
import com.example.backend.entity.Capacity;
import com.example.backend.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/capacity/")
public class CapacityController {
    @Autowired
    private CapacityServiceImpl capacityService;

    @GetMapping("display")
    public Page<Capacity> viewAll(@RequestParam(value = "page",defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page,2);
        return capacityService.getAll(pageable);
    }

    @PostMapping("save")
    public void save(@RequestBody Capacity capacity) {
        capacityService.insert(capacity);
    }

    @PutMapping("update/{id}")
    public void update(@RequestBody Capacity capacity,@PathVariable("id") Integer id) {
        capacity.setId(id);
        capacityService.update(capacity, id);
    }

    @DeleteMapping("delete")
    public void delete(@RequestParam("id")Integer id) {
        capacityService.delete(id);
    }


}
