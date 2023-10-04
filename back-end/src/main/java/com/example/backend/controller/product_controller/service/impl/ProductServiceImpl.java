package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.model.request.CreateProduct;
import com.example.backend.entity.SKU;
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
import com.example.backend.repository.SKURepositoty;
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
import java.util.List;

@Service
public class ProductServiceImpl {
    @Autowired
    private SKURepositoty skuRepositoty;
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

        // Tạo danh sách SKU và thêm chúng vào sản phẩm
        List<SKU> skus = new ArrayList<>();

        if (colorNames != null && capacityNames != null) {
            for (String colorName : colorNames) {
                for (String capacityName : capacityNames) {
                    Color color = colorRepository.findByName(colorName);
                    Capacity capacity = capacityRepository.findByName(capacityName);

                    if (color != null && capacity != null) {
                        SKU sku = new SKU();
                        sku.setColor(color.getName());
                        sku.setCapacity(capacity.getName());
                        sku.setQuantity(0); // Khởi tạo số lượng là 0
                        sku.setProduct(sanPham);
                        skus.add(sku);
                    }
                }
            }
        }

        sanPham.setSkus(skus);

        int quantity = skus.size();
        sanPham.setQuantity(quantity);

        sanPham = productRepository.save(sanPham);

        long totalRecords = productRepository.count();
        System.out.println("Tổng số bản ghi lưu trữ là: " + totalRecords);

        return sanPham;
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

    public Page<Product> productNew(Pageable pageable, String key){
        return productRepository.productNew(pageable, key);
    }

    public Page<Product> productCheap(Pageable pageable, String key){
        return productRepository.productCheap(pageable, key);
    }

    public Page<Product> filterProductByPrice(Pageable pageable, String key, Integer minPrice, Integer maxPrice){
        return productRepository.filterProductByPrice(pageable, key, minPrice, maxPrice);
    }

    public Page<Product> filterProductByCategory(Pageable pageable, String key, String nameCategory){
        return productRepository.filterProductByCategory(pageable, key, nameCategory);
    }

    public Page<Product> filterProductByAscendingPrice(Pageable pageable, String key){
        return productRepository.filterProductByAscendingPrice(pageable, key);
    }

    public Page<Product> filterProductByDecreasePrice(Pageable pageable, String key){
        return productRepository.filterProductByDecreasePrice(pageable, key);
    }
}