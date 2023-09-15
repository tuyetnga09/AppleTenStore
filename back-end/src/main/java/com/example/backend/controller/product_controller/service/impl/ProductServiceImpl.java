package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.model.request.CreateProduct;
import com.example.backend.controller.product_controller.repository.BatteryRepository;
import com.example.backend.controller.product_controller.repository.CapacityRepository;
import com.example.backend.controller.product_controller.repository.CategoryRepository;
import com.example.backend.controller.product_controller.repository.ChipRepository;
import com.example.backend.controller.product_controller.repository.ColorRepository;
import com.example.backend.controller.product_controller.repository.ImageRepository;
import com.example.backend.controller.product_controller.repository.ManufactureRepository;
import com.example.backend.controller.product_controller.repository.ProductRepository;
import com.example.backend.controller.product_controller.repository.RamRepository;
import com.example.backend.controller.product_controller.repository.ScreenRepository;
import com.example.backend.controller.product_controller.repository.SizeRepository;
import com.example.backend.entity.Battery;
import com.example.backend.entity.Capacity;
import com.example.backend.entity.Category;
import com.example.backend.entity.Chip;
import com.example.backend.entity.Color;
import com.example.backend.entity.Image;
import com.example.backend.entity.Manufacture;
import com.example.backend.entity.Product;
import com.example.backend.entity.Ram;
import com.example.backend.entity.Screen;
import com.example.backend.entity.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private BatteryRepository batteryRepository;
    @Autowired
    private CapacityRepository capacityRepository;

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ChipRepository chipRepository;
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private ManufactureRepository manufacturerRepository;
    @Autowired
    private RamRepository ramRepository;
    @Autowired
    private ScreenRepository screenRepository;
    @Autowired
    private SizeRepository sizeRepository;

    @Autowired
    private ImageRepository imageRepository;


    public Page<Product> getAll(Pageable pageable) {
        return productRepository.getAllPage(pageable);
    }
    public Product insert(CreateProduct product) {
        Chip chip = chipRepository.findByName(product.getChip());
        Battery battery = batteryRepository.findByName(product.getBattery());
        Capacity capacity = capacityRepository.findByName(product.getCapacity());
        Color color = colorRepository.findByName(product.getColor());
        Image image = imageRepository.findByLink(product.getImage());
        Manufacture manufacture = manufacturerRepository.findByName(product.getManufacturer());
        Ram ram = ramRepository.findByName(product.getRam());
        Screen screen = screenRepository.findByName(product.getScreen());
        Size size = sizeRepository.findByName(product.getSize());
        Category category = categoryRepository.findByName(product.getCategory());
        Product sanPham = new Product();
        sanPham.setName(product.getNameProduct());
        sanPham.setCode(product.getCodeProduct());
        sanPham.setDescription(product.getDescription());
        sanPham.setPrice(product.getPrice());
        sanPham.setIdchip(chip);
        sanPham.setIdbattery(battery);
        sanPham.setIdcapacity(capacity);
        sanPham.setIdimage(image);
        sanPham.setIdmanufacture(manufacture);
        sanPham.setIdcolor(color);
        sanPham.setIdscreen(screen);
        sanPham.setIdsize(size);
        sanPham.setIdRam(ram);
        sanPham.setIdcategory(category);
        sanPham.setStatus(0);
       return  productRepository.save(sanPham);
    }

    public void delete(Integer id) {
        productRepository.deleteById(id);
    }
    public void delete(Product product) {
        product.setStatus(1);
        productRepository.save(product);

    }
    public void returnDelete(Product product) {
        product.setStatus(0);
        productRepository.save(product);
    }

    public Page<Product> getDelete(Pageable pageable) {
        return productRepository.getAllPageDelete(pageable);
    }


}
