package com.example.backend.controller.product_controller.controller;

import com.example.backend.entity.Battery;
import com.example.backend.repository.CapacityRepository;
import com.example.backend.controller.product_controller.service.impl.CapacityServiceImpl;
import com.example.backend.entity.Capacity;
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
@RequestMapping("/admin/capacity/")
public class CapacityController {
    @Autowired
    private CapacityServiceImpl capacityService;
    @Autowired
    private CapacityRepository capacityRepository;

    @GetMapping("display")
    public ResponseEntity<Page<Capacity>> viewAll(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Capacity> capacityPage = capacityService.search(pageable, key);
        return new ResponseEntity<>(capacityPage, HttpStatus.OK);
    }

    @GetMapping("get-all-capacity")
    public ResponseEntity<List<Capacity>> getAllCapacity() {
        return new ResponseEntity<>(capacityService.getAll(), HttpStatus.OK);
    }

    @PostMapping("save")
    public void save(@RequestBody Capacity capacity) {
        capacityService.insert(capacity);
    }

    @PutMapping("update/{id}")
    public void update(@RequestBody Capacity capacity, @PathVariable("id") Integer id) {
        capacity.setId(id);
        capacityService.update(capacity, id);
    }

    @PutMapping("delete/{id}")
    public void delete(@PathVariable("id") Integer id) {
        Capacity capacity = capacityRepository.findById(id).orElse(null);
        capacityService.delete(capacity);
    }

    @GetMapping("displayDelete")
    public ResponseEntity<Page<Capacity>> viewAllDelete(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Capacity> listCapacity = capacityService.getDeletes(pageable, key);
        return new ResponseEntity<>(listCapacity, HttpStatus.OK);
    }

    @GetMapping("return/{id}")
    public void returnDelete(@PathVariable("id") Integer id) {
        Capacity capacity = capacityRepository.findById(id).orElse(null);
        capacityService.returnDelete(capacity);
    }

    @PostMapping("import")
    public ResponseEntity<String> importRam(@RequestParam("file") MultipartFile file) {
        try {
            capacityService.importDataFromExcel(file);
            return ResponseEntity.ok("Import Thành Công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok("Import Thất bại");
        }
    }

    @GetMapping("search")
    public Page<Capacity> search(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                 @RequestParam(value = "search", required = false) String search) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Capacity> listCapacity = capacityService.search(search, pageable);
        return listCapacity;
    }

    @GetMapping(value = "/find-capacity-by-id-product/{id}")
    public List<Capacity> findCapacitisByIdProduct(@PathVariable int id){
        return this.capacityRepository.findCapacitiesByIdProduct(id);
    }

    @GetMapping(value = "getCode")
    public List<String> getCode(){
        return capacityRepository.getCode();
    }

    @GetMapping("{id}")
    public ResponseEntity<Capacity> detail(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(capacityRepository.findById(id).get(), HttpStatus.OK);
    }

}
