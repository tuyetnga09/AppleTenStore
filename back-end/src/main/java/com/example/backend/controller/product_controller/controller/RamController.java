package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.service.impl.RamServiceImpl;
import com.example.backend.entity.Ram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/ram/")
public class RamController {
    @Autowired
    private RamServiceImpl ramService;

    @GetMapping("display")
    public List<Ram> viewAll(@RequestParam(value = "page",defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 10);
        Page<Ram> listRam = ramService.getAll(pageable);
        return listRam.getContent();
    }

    @PostMapping("save")
    public void save(@RequestBody Ram ram) {
        ramService.insert(ram);
    }

    @PutMapping("update/{id}")
    public void update(@RequestBody Ram ram,@PathVariable("id") Integer id) {
        ram.setId(id);
        ramService.insert(ram);
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id")  Integer id) {
        ramService.delete(id);
    }
}
