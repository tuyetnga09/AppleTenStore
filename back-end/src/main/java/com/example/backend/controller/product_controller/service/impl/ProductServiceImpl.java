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
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

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


    public Product getOne(Integer id) {
        return this.productRepository.findById(id).orElse(null);
    }

    public List<Product> selectAll() {
        return this.productRepository.selectAll();
    }

    public Page<Product> search(Pageable pageable, String key) {
        return productRepository.search(pageable, key);
    }

    public Page<Product> deleteProduct(Pageable pageable, String key) {
        return productRepository.deleteProduct(pageable, key);
    }

    public List<Product> selectNewProduct() {
        return productRepository.selectNewProduct();
    }

    public List<Product> selectChipProduct() {
        return productRepository.selectChipProduct();
    }

    public Product findById(int id) {
        return this.productRepository.findById(id);

    }

    public Page<Product> productNew(Pageable pageable, String key) {
        return productRepository.productNew(pageable, key);
    }

    public Page<Product> productCheap(Pageable pageable, String key) {
        return productRepository.productCheap(pageable, key);
    }

    public Page<Product> filterProductByPrice(Pageable pageable, String key, Integer minPrice, Integer maxPrice) {
        return productRepository.filterProductByPrice(pageable, key, minPrice, maxPrice);
    }

    public Page<Product> filterProductByCategory(Pageable pageable, String key, String nameCategory) {
        return productRepository.filterProductByCategory(pageable, key, nameCategory);
    }

    public Page<Product> filterProductByAscendingPrice(Pageable pageable, String key) {
        return productRepository.filterProductByAscendingPrice(pageable, key);
    }

    public Page<Product> filterProductByDecreasePrice(Pageable pageable, String key) {
        return productRepository.filterProductByDecreasePrice(pageable, key);
    }

    public List<Product> listProductByCategories(Integer id) {
        return productRepository.listProductByCategories(id);
    }

    public CreateProduct getOne1(Integer id) {
        if (productRepository.existsById(id)) {
            Product product = productRepository.findById(id).get();
            List<SKU> skuList = skuRepositoty.findByProduct(product);
            List<String> capacityList = skuList.stream().map(s -> s.getCapacity()).distinct().collect(Collectors.toList());
            List<String> colorList = skuList.stream().map(s -> s.getColor()).distinct().collect(Collectors.toList());

            CreateProduct editProduct = new CreateProduct();
            editProduct.setCodeProduct(product.getCode());
            editProduct.setNameProduct(product.getName());
            editProduct.setPrice(product.getPrice());
            editProduct.setDescription(product.getDescription());
            editProduct.setBattery(product.getIdbattery().getName());
            editProduct.setCapacity(capacityList);
            editProduct.setCategory(product.getIdcategory().getName());
            editProduct.setChip(product.getIdchip().getName());
            editProduct.setColor(colorList);
            editProduct.setManufacturer(product.getIdmanufacture().getName());
            editProduct.setRam(product.getIdRam().getName());
            editProduct.setScreen(product.getIdscreen().getName());
            editProduct.setSize(product.getIdsize().getName());

            return editProduct;
        }
        return null;
    }

    public String update(CreateProduct productUpdate, Integer id) {
        //  productUpdate là đối tượng được FE truyền vào để cập nhật lại
        if (productRepository.existsById(id)) {
            Chip chip = chipRepository.findByName(productUpdate.getChip());
            Battery battery = batteryRepository.findByName(productUpdate.getBattery());
            Manufacture manufacture = manufacturerRepository.findByName(productUpdate.getManufacturer());
            Ram ram = ramRepository.findByName(productUpdate.getRam());
            Screen screen = screenRepository.findByName(productUpdate.getScreen());
            Size size = sizeRepository.findByName(productUpdate.getSize());
            Category category = categoryRepository.findByName(productUpdate.getCategory());
            //Image image = imageRepository.findByLink(productUpdate.getImage());
            List<String> capacityList = productUpdate.getCapacity(); // list capacity truyền vào để edit
            List<String> colorList = productUpdate.getColor();  //list color truyền vào để edit

            Product product = productRepository.findById(id).get(); // lấy sản phẩm theo id từ CSDL

            List<SKU> skuList = skuRepositoty.findByProduct(product); // lisst sku theo product


            product.setName(productUpdate.getNameProduct());
            product.setDescription(productUpdate.getDescription());
            product.setPrice(productUpdate.getPrice());
            product.setIdchip(chip);
            product.setIdbattery(battery);
            product.setIdmanufacture(manufacture);
            product.setIdscreen(screen);
            product.setIdsize(size);
            product.setIdRam(ram);
            product.setIdcategory(category);
            product.setDateUpdate(new Date());

            // kkiểm tra xem dữ liệu đầu vào có giống với lúc đầu không
            Boolean isCkeckCapacity = capacityList.containsAll(skuList.stream().map(s -> s.getCapacity()).collect(Collectors.toList()));
            Boolean isCkeckColor = colorList.containsAll(skuList.stream().map(s -> s.getColor()).collect(Collectors.toList()));
            //lisst String capacity
            List<String> sizeCapacityList = skuList.stream().map(s -> s.getCapacity()).collect(Collectors.toList());
            // lisst string color
            List<String> sizeColorList = skuList.stream().map(s -> s.getColor()).collect(Collectors.toList());


            if (isCkeckCapacity && isCkeckColor && capacityList.size() == sizeCapacityList.size() && colorList.size() == sizeColorList.size()) {
                System.out.println(" ===================------------------------======================= ");

            } else {

                // tìm và xoá các sku bị xoá color ỏ capacity
                int skuListSize = skuList.size();
                List<String> capacityListDelete = new ArrayList<>(); // list capacity bị xoá khi product edit
                List<String> colorListDelete = new ArrayList<>(); // list color bị xoá khi product edit

                for (int i = 0; i < skuListSize; i++) {
                    if (capacityList.contains(skuList.get(i).getCapacity().trim())) {
                        System.out.println("------------1");
                    } else {
                        capacityListDelete.add(skuList.get(i).getCapacity().trim());
                    }
                    //
                    if (colorList.contains(skuList.get(i).getColor().trim())) {
                        System.out.println("------------1");
                    } else {
                        colorListDelete.add(skuList.get(i).getColor().trim());
                    }
                }
                //.stream().distinct() xoá những giá trị trùng lặp trong list
                capacityListDelete = capacityListDelete.stream().distinct().collect(Collectors.toList());
                colorListDelete = colorListDelete.stream().distinct().collect(Collectors.toList());

                if (capacityListDelete.size() > 0 && colorListDelete.size() == 0) {
                    capacityListDelete.stream().distinct();
                    // nếu capacityListDelete != null thì đã có capacity bị xoá đi khi edit product
                    // colorListDelete == null là các color cũ vẫn đang giữ nguyên
                    // -> lúc này cần xoá các bản ghi  SKU cũ có chữa capacityListDelete
                    for (String capacity : capacityListDelete) {
                        List<SKU> listSkuDelete = skuRepositoty.findByProductAndCapacity(product, capacity);
                        if (!listSkuDelete.isEmpty()) {
                            for (int i = 0; i < listSkuDelete.size(); i++) {
                                skuRepositoty.deleteById(listSkuDelete.get(i).getId());
                                System.out.println("------------1 ok");

                            }
                        }
                    }

                }
                if (capacityListDelete.size() == 0 && colorListDelete.size() > 0) {
                    // nếu colorListDelete != null thì đã có color bị xoá đi khi edit product
                    // capacityListDelete == null là các capacity cũ vẫn đang giữ nguyên
                    // -> lúc này cần xoá các bản ghi  SKU cũ có chữa colorListDelete
                    for (String color : colorListDelete) {
                        List<SKU> listSkuDelete = skuRepositoty.findByProductAndColor(product, color);
                        if (!listSkuDelete.isEmpty()) {
                            for (int i = 0; i < listSkuDelete.size(); i++) {
                                skuRepositoty.deleteById(listSkuDelete.get(i).getId());
                                System.out.println("------------2 ok");

                            }

                        }
                    }

                }
                System.out.println(colorListDelete.size() + " hihi -------------------------");
                System.out.println(colorListDelete + " hihi -------------------------");
                System.out.println(colorListDelete.isEmpty() + " hihi -------------------------");
                System.out.println((colorListDelete == null) + " hihi -------------------------");


                if (capacityListDelete.size() > 0 && colorListDelete.size() > 0) {
                    // nếu colorListDelete != null thì đã có color bị xoá đi khi edit product
                    // capacityListDelete != null là các capacity bị xoá đi khi edit product
                    // -> lúc này cần xoá các bản ghi  SKU cũ có chữa colorListDelete vaf capacityListDelete
                    for (String capacity : sizeCapacityList) {
                        // xoá tất cả bản ghi duyệt theo capacity trước lúc cập nhật và xoá theo các color đã bị xoá đi khi được thêm vào để edit
                        for (String color : colorListDelete) {
                            SKU skuDelete = skuRepositoty.findByProductAndCapacityAndColor(product, capacity, color);
                            if (skuDelete != null) {
                                skuRepositoty.deleteById(skuDelete.getId());
                            }
                        }

                    }

                    for (String color : sizeColorList) {
                        // xoá tất cả bản ghi duyệt theo color trước lúc cập nhật và xoá theo các capacity đã bị xoá đi khi được thêm vào để edit
                        for (String capacity : capacityListDelete) {
                            SKU skuDelete = skuRepositoty.findByProductAndCapacityAndColor(product, capacity, color);
                            if (skuDelete != null) {
                                skuRepositoty.deleteById(skuDelete.getId());
                            }
                        }

                    }
                }

                if (capacityList != null && colorList != null) {
                    skuList.clear(); // xoá rỗng list
                    for (String colorName : colorList) {
                        for (String capacityName : capacityList) {
                            SKU skuCheck = skuRepositoty.findByProductAndCapacityAndColor(product, capacityName, colorName);
                            if (skuCheck != null) {
                                skuList.add(skuCheck); // add sku vaof lisst để chút cập nhật
                                // skuCheck != null là skuCheck đã tồn tại nên bỏ qua, không cần cập nhật
                                continue;
                            }
                            Color color = colorRepository.findByName(colorName); // lấy ra color theo name
                            Capacity capacity = capacityRepository.findByName(capacityName);// lấy ra capacity theo name

                            if (color != null && capacity != null) {
                                SKU sku = new SKU();
                                sku.setColor(color.getName());
                                sku.setCapacity(capacity.getName());
                                sku.setQuantity(0);  //các sku chưa có imei mặc đinh là 0
                                sku.setProduct(product);
                                skuList.add(sku);
                            }
                        }
                    }
                }
            }

            // colorList list name color đc truyền vaò thao đối tượng product để edit
            List<Color> colors = new ArrayList<>();
            if (colorList != null) {
                for (String colorName : colorList) {
                    Color color = colorRepository.findByName(colorName);
                    if (color != null) {
                        colors.add(color);
                    }
                }
            }
            product.setColors(colors);

            //  capacityList list name capacity đc truyền vaò thao đối tượng product để edit
            List<Capacity> capacities = new ArrayList<>();
            if (capacityList != null) {
                for (String capacityName : capacityList) {
                    Capacity capacity = capacityRepository.findByName(capacityName);
                    if (capacity != null) {
                        capacities.add(capacity);
                    }
                }
            }
            product.setCapacities(capacities);

//            product.setIdimage(image);
            product.setSkus(skuList);
            product.setQuantity(skuList.size());
            productRepository.save(product);
            return "Cập Nhật Thành Công.";
        } else {
            return "Cập Nhật Thất Bại! - Sản Phẩm Không Tồn Tại.";
        }
    }


}