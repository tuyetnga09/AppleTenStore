package com.example.backend.controller.product_controller.controller;

import com.example.backend.repository.ManufactureRepository;
import com.example.backend.controller.product_controller.service.impl.ManufactureServiceImpl;
import com.example.backend.entity.Manufacture;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/manufacture/")
public class ManufactureController {
    @Autowired
    private ManufactureServiceImpl manufactureService;
    @Autowired
    private ManufactureRepository manufactureRepository;

    @GetMapping("display")
    public Page<Manufacture> viewAll(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return manufactureService.getAll(pageable);
    }

    @GetMapping("get-all-manufacture")
    public ResponseEntity<List<Manufacture>> getAllManufacture() {
        return new ResponseEntity<>(manufactureService.getAll(), HttpStatus.OK);
    }

    @PostMapping("save")
    public void save(@RequestBody Manufacture manufacture) {
        manufactureService.insert(manufacture);
    }

    @PutMapping("update/{id}")
    public void update(@RequestBody Manufacture manufacture, @PathVariable("id") Integer id) {
        manufacture.setId(id);
        manufactureService.update(manufacture, id);
    }

    @PutMapping("delete/{id}")
    public void delete(@PathVariable("id") Integer id) {
        Manufacture manufacture = manufactureRepository.findById(id).orElse(null);
        manufactureService.delete(manufacture);
    }

    @GetMapping("displayDelete")
    public Page<Manufacture> viewAllDelete(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Manufacture> listManufacture = manufactureService.getDelete(pageable);
        return listManufacture;
    }

    @GetMapping("return/{id}")
    public void returnDelete(@PathVariable("id") Integer id) {
        Manufacture manufacture = manufactureRepository.findById(id).orElse(null);
        manufactureService.returnDelete(manufacture);
    }

    @PostMapping("import")
    public ResponseEntity<String> importRam(@RequestParam("file") MultipartFile file) {
        try {
            manufactureService.importDataFromExcel(file);
            return ResponseEntity.ok("Import Thành Công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok("Import Thất bại");
        }
    }

    @GetMapping("search")
    public Page<Manufacture> search(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                    @RequestParam(value = "search", required = false) String search) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Manufacture> listManufacture = manufactureService.search(search, pageable);
        return listManufacture;
    }

    @GetMapping("getCode")
    public List<String> getCode(){
        return this.manufactureService.getCode();
    }

}
