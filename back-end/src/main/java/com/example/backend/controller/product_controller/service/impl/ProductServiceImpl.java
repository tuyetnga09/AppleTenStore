package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.model.request.CreateProduct;
import com.example.backend.repository.BatteryRepository;
import com.example.backend.repository.CapacityRepository;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ChipRepository;
import com.example.backend.repository.ColorRepository;
import com.example.backend.repository.ImageRepository;
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


import java.util.Date;
import java.util.Optional;

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


    public Page<Product> getAll(Pageable pageable) {
        return productRepository.getAllPage(pageable);
    }

    public Product insert(CreateProduct product) {
        Product sanPham = new Product();
        Chip chip = chipRepository.findByName(product.getChip());
        Battery battery = batteryRepository.findByName(product.getBattery());
        Capacity capacity = capacityRepository.findByName(product.getCapacity());
        Color color = colorRepository.findByName(product.getColor());
        Manufacture manufacture = manufacturerRepository.findByName(product.getManufacturer());
        Ram ram = ramRepository.findByName(product.getRam());
        Screen screen = screenRepository.findByName(product.getScreen());
        Size size = sizeRepository.findByName(product.getSize());
        Category category = categoryRepository.findByName(product.getCategory());
        sanPham.setName(product.getNameProduct());
        sanPham.setCode(product.getCodeProduct());
        sanPham.setDescription(product.getDescription());
        sanPham.setPrice(product.getPrice());
        sanPham.setIdchip(chip);
        sanPham.setIdbattery(battery);
        sanPham.setIdcapacity(capacity);
        sanPham.setIdmanufacture(manufacture);
        sanPham.setIdcolor(color);
        sanPham.setIdscreen(screen);
        sanPham.setIdsize(size);
        sanPham.setIdRam(ram);
        sanPham.setIdcategory(category);
        sanPham.setStatus(0);
        sanPham.setQuantity(0);
        sanPham.setDateCreate(new Date());
        return productRepository.save(sanPham);
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

    public String update(CreateProduct productUpdate, Integer id) {
        //  productUpdate là đối tượng được FE truyền vào để cập nhật lại
        if (productRepository.existsById(id)) {
            Color color = colorRepository.findByName(productUpdate.getColor()); // tìm kiếm đối tượng theo name
            Chip chip = chipRepository.findByName(productUpdate.getChip());
            Battery battery = batteryRepository.findByName(productUpdate.getBattery());
            Capacity capacity = capacityRepository.findByName(productUpdate.getCapacity());
            Manufacture manufacture = manufacturerRepository.findByName(productUpdate.getManufacturer());
            Ram ram = ramRepository.findByName(productUpdate.getRam());
            Screen screen = screenRepository.findByName(productUpdate.getScreen());
            Size size = sizeRepository.findByName(productUpdate.getSize());
            Category category = categoryRepository.findByName(productUpdate.getCategory());
            //Image image = imageRepository.findByLink(productUpdate.getImage());

            Product product = productRepository.findById(id).get(); // lấy sản phẩm theo id từ CSDL

            product.setName(productUpdate.getNameProduct());
            product.setDescription(productUpdate.getDescription());
            product.setPrice(productUpdate.getPrice());
            product.setIdchip(chip);
            product.setIdbattery(battery);
            product.setIdcapacity(capacity);
            product.setIdmanufacture(manufacture);
            product.setIdcolor(color);
            product.setIdscreen(screen);
            product.setIdsize(size);
            product.setIdRam(ram);
            product.setIdcategory(category);
            product.setDateUpdate(new Date());

//            product.setIdimage(image);

            productRepository.save(product);
            return "Cập Nhật Thành Công.";
        } else {
            return "Cập Nhật Thất Bại! - Sản Phẩm Không Tồn Tại.";
        }
    }

    public Product getOne(Integer id) {
        return this.productRepository.findById(id).orElse(null);
    }

    public List<Product> selectAll(){
        return this.productRepository.selectAll();
    }

    public CreateProduct getOneUpdateProduct(Integer id) {
        if (!productRepository.existsById(id)){
            return null;
        }

        CreateProduct createProduct = new CreateProduct(); // tạo đối tượng để detail

        Product product = productRepository.findById(id).get(); //lấy ra đối tượng theo id

        //set lại giá trị vừa find ra cho đối tượng detail
//        createProduct.setCodeProduct(product.getCode());
        createProduct.setNameProduct(product.getName());
        createProduct.setDescription(product.getDescription());
        createProduct.setPrice(product.getPrice());
        createProduct.setCategory(product.getIdcategory().getName());
        createProduct.setCapacity(product.getIdcapacity().getName());
        createProduct.setBattery(product.getIdbattery().getName());
        createProduct.setChip(product.getIdchip().getName());
        createProduct.setColor(product.getIdcolor().getName());
        createProduct.setManufacturer(product.getIdmanufacture().getName());
        createProduct.setRam(product.getIdRam().getName());
        createProduct.setScreen(product.getIdscreen().getName());
        createProduct.setSize(product.getIdsize().getName());

        return createProduct;
    }
}
