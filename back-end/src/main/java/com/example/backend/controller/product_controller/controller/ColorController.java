package com.example.backend.controller.product_controller.controller;
import com.example.backend.controller.product_controller.service.impl.ColorServiceImpl;
import com.example.backend.entity.Color;
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

@CrossOrigin("*")
@RestController
@RequestMapping("/color/")
public class ColorController {
    @Autowired
    private ColorServiceImpl colorService;

    @GetMapping("display")
    public Page<Color> viewAll(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 2);
        return colorService.getAll(pageable);
    }

    @PostMapping("save")
    public void save(@RequestBody Color color) {
        colorService.insert(color);
    }

    @PutMapping("update/{id}")
    public void update(@RequestBody Color color,@PathVariable("id") Integer id) {
        color.setId(id);
        colorService.update(color, id);
    }

    // hàm xử lý
    @DeleteMapping("delete")
    public void delete(@RequestParam("id") Integer id) {
        colorService.delete(id);
    }

}
