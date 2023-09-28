package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.model.request.CreateProduct;
import com.example.backend.entity.Imei;
import com.example.backend.repository.BatteryRepository;
import com.example.backend.repository.CapacityRepository;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ChipRepository;
import com.example.backend.repository.ColorRepository;
import com.example.backend.repository.ImageRepository;
import com.example.backend.repository.ImeiRepository;
import com.example.backend.repository.ManufactureRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.RamRepository;
import com.example.backend.repository.ScreenRepository;
import com.example.backend.repository.SizeRepository;
import com.example.backend.entity.Battery;
import com.example.backend.entity.Capacity;
import com.example.backend.entity.Category;
import com.example.backend.entity.Chip;
import com.example.backend.entity.Color;
import com.example.backend.entity.Manufacture;
import com.example.backend.entity.Product;
import com.example.backend.entity.Ram;
import com.example.backend.entity.Screen;
import com.example.backend.entity.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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

    @Autowired
    private ImeiRepository imeiRepository;


    public Page<Product> getAll(Pageable pageable) {
        return productRepository.getAllPage(pageable);
    }

    public Product insert(CreateProduct product) {
        Product sanPham = new Product();

        // Lấy thông tin từ các repositories
        Chip chip = chipRepository.findByName(product.getChip());
        Battery battery = batteryRepository.findByName(product.getBattery());
        Manufacture manufacture = manufacturerRepository.findByName(product.getManufacturer());
        Ram ram = ramRepository.findByName(product.getRam());
        Screen screen = screenRepository.findByName(product.getScreen());
        Size size = sizeRepository.findByName(product.getSize());
        Category category = categoryRepository.findByName(product.getCategory());

        // Đặt các thuộc tính của sản phẩm
        sanPham.setName(product.getNameProduct());
        sanPham.setCode(product.getCodeProduct());
        sanPham.setDescription(product.getDescription());
        sanPham.setPrice(product.getPrice());
        sanPham.setIdchip(chip);
        sanPham.setIdbattery(battery);
        sanPham.setIdmanufacture(manufacture);
        sanPham.setIdscreen(screen);
        sanPham.setIdsize(size);
        sanPham.setIdRam(ram);
        sanPham.setIdcategory(category);
        sanPham.setStatus(0);

        List<String> colorNames = product.getColor();
        List<String> capacityNames = product.getCapacity();

        List<Color> colors = new ArrayList<>();
        if (colorNames != null) {
            for (String colorName : colorNames) {
                Color color = colorRepository.findByName(colorName);
                if (color != null) {
                    colors.add(color);
                }
            }
        }
        sanPham.setColors(colors);

        List<Capacity> capacities = new ArrayList<>();
        if (capacityNames != null) {
            for (String capacityName : capacityNames) {
                Capacity capacity = capacityRepository.findByName(capacityName);
                if (capacity != null) {
                    capacities.add(capacity);
                }
            }
        }
        sanPham.setCapacities(capacities);

        String sku = "[" + String.join(", ", capacityNames) + "]-[" + String.join(", ", colorNames) + "]";
        sanPham.setSku(sku);

        int quantity = 0;
        if (capacities != null && colors != null) {
            quantity = capacities.size() * colors.size();
        }
        sanPham.setQuantity(quantity);

        sanPham = productRepository.save(sanPham);

        generateAndAssignImei(sanPham, quantity);

        return sanPham;
    }

    private void generateAndAssignImei(Product product, int quantity) {
        for (int i = 0; i < quantity; i++) {
            Imei imei = new Imei();

            String generatedImei = generateImei();

            imei.setCodeImei(generatedImei);

            imei.setIdProduct(product);

            imeiRepository.save(imei);
        }
    }

    private String generateImei() {
        StringBuilder imei = new StringBuilder();
        for (int i = 0; i < 15; i++) {
            imei.append((int) (Math.random() * 10));
        }
        return imei.toString();
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

    public void update(Product updatedProduct, Integer id) {
    }


    public Product getOne(Integer id) {
        return this.productRepository.findById(id).orElse(null);
    }

    public List<Product> selectAll(){
        return this.productRepository.selectAll();
    }

    public Page<Product> search(Pageable pageable, String key) {
        return productRepository.search(pageable, key);
    }

    public Page<Product> deleteProduct(Pageable pageable, String key) {
        return productRepository.deleteProduct(pageable, key);
    }
}
