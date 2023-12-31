package com.example.backend.controller.product_controller.controller;

import com.example.backend.entity.Battery;
import com.example.backend.repository.ScreenRepository;
import com.example.backend.controller.product_controller.service.impl.ScreenServiceImpl;
import com.example.backend.entity.Screen;
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
@RequestMapping("/admin/screen/")
public class ScreenController {
    @Autowired
    private ScreenServiceImpl screenService;

    @Autowired
    private ScreenRepository screenRepository;

    @GetMapping("{id}")
    public ResponseEntity<Screen> detail(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(screenRepository.findById(id).orElse(null), HttpStatus.OK);
    }

    @GetMapping("get-all-screen")
    public ResponseEntity<List<Screen>> getAllScreen() {
        return new ResponseEntity<>(screenService.getAll(), HttpStatus.OK);
    }

    @GetMapping("display")
    public ResponseEntity<Page<Screen>> viewAll(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key){
        Pageable pageable = PageRequest.of(page, 5);
        Page<Screen> listScreen = screenService.searchGetAllDisplay(pageable, key);
        return new ResponseEntity<>(listScreen, HttpStatus.OK);
    }

    @GetMapping("displayDelete")
    public ResponseEntity<Page<Screen>> viewDelete(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Screen> listScreen = screenService.getDisplayDelete(pageable, key);
        return new ResponseEntity<>(listScreen, HttpStatus.OK);
    }

    @PostMapping("save")
    public void save(@RequestBody Screen screen) {
        screenService.insert(screen);
    }

    @PutMapping("update/{id}")
    public void update(@RequestBody Screen screen, @PathVariable("id") Integer id) {
        screen.setId(id);
        screenService.insert(screen);
    }

    @PutMapping("delete/{id}")
    public void delete(@PathVariable("id") Integer id) {
        Screen screen = screenRepository.findById(id).orElse(null);
        screenService.delete(screen);
    }

    @PutMapping("return/{id}")
    public void returnS(@PathVariable("id") Integer id) {
        Screen screen = screenRepository.findById(id).orElse(null);
        screenService.returnDelete(screen);
    }

    @PostMapping("import")
    public ResponseEntity<String> importRam(@RequestParam("file") MultipartFile file) {
        try {
            screenService.importDataFromExcel(file);
            return ResponseEntity.ok("Import Thành Công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok("Import Thất bại");
        }
    }

    @GetMapping(value = "getCode")
    public List<String> getCode(){
        return this.screenService.getCode();
    }

}
