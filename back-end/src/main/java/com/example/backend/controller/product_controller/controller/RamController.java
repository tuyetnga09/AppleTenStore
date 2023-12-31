package com.example.backend.controller.product_controller.controller;

import com.example.backend.entity.Battery;
import com.example.backend.repository.RamRepository;
import com.example.backend.controller.product_controller.service.impl.RamServiceImpl;
import com.example.backend.entity.Ram;
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
@RequestMapping("/admin/ram/")
public class RamController {
    @Autowired
    private RamServiceImpl ramService;

    @Autowired
    private RamRepository ramRepository;

    @GetMapping("{id}")
    public ResponseEntity<Ram> detail(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(ramRepository.findById(id).orElse(null), HttpStatus.OK);
    }

    @GetMapping("get-all-ram")
    public ResponseEntity<List<Ram>> getAllRam() {
        return new ResponseEntity<>(ramService.getAll(), HttpStatus.OK);
    }

    @GetMapping("display")
    public ResponseEntity<Page<Ram>> viewAll(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Ram> listRam = ramService.searchDisplay(pageable, key);
        return new ResponseEntity<>(listRam, HttpStatus.OK);
    }

    @GetMapping("displayDelete")
    public ResponseEntity<Page<Ram>> viewAllDelete(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Ram> listRam = ramService.getDeleteDisplay(pageable, key);
        return new ResponseEntity<>(listRam, HttpStatus.OK);
    }

    @PostMapping("save")
    public void save(@RequestBody Ram ram) {
        ramService.insert(ram);
    }

    @PutMapping("update/{id}")
    public void update(@RequestBody Ram ram, @PathVariable("id") Integer id) {
        ram.setId(id);
        ramService.insert(ram);
    }

    @PutMapping("delete/{id}")
    public void delete(@PathVariable("id") Integer id) {
        Ram ram = ramRepository.findById(id).orElse(null);
        ramService.delete(ram);
    }

    @PutMapping("return/{id}")
    public void returnDelete(@PathVariable("id") Integer id) {
        Ram ram = ramRepository.findById(id).orElse(null);
        ramService.returnDelete(ram);
    }

    @PostMapping("import")
    public ResponseEntity<String> importRam(@RequestParam("file") MultipartFile file) {
        try {
            ramService.importDataFromExcel(file);
            return ResponseEntity.ok("Import Thành Công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok("Import Thất bại");
        }
    }

    @GetMapping("search")
    public Page<Ram> search(@RequestParam(value = "page", defaultValue = "0") Integer page,
                            @RequestParam(value = "search", required = false) String search) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Ram> listRam = ramService.search(search, pageable);
        return listRam;
    }

    @GetMapping(value = "getCode")
    public List<String> getCode(){
        return ramService.getCode();
    }

}
