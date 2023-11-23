package com.example.backend.controller.voucher_managment.service.impl;

import com.example.backend.controller.voucher_managment.model.request.CreateVoucherRequest;
import com.example.backend.controller.voucher_managment.model.request.FindVoucherRequest;
import com.example.backend.controller.voucher_managment.model.request.UpdateVoucherRequest;
import com.example.backend.controller.voucher_managment.model.response.VoucherResponse;
import com.example.backend.repository.VoucherRepository;
import com.example.backend.controller.voucher_managment.service.VoucherService;
import com.example.backend.entity.Voucher;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Validated
@Component
public class VoucherServiceImpl implements VoucherService {


    @Autowired
    private VoucherRepository voucherRepository;

    @Scheduled(fixedRate = 10000)
    public List<Voucher> updateStatusVoucher() {
        Date dateTime = new Date();
        List<Voucher> listToUpdate = new ArrayList<>();

        List<Voucher> list = voucherRepository.checkToStartAfterAndStatus(dateTime, 3);
        List<Voucher> list1 = voucherRepository.checkEndDateAndStatus(dateTime, 2);
        List<Voucher> list3 = voucherRepository.checkToStartBeforeDateNowAndStatus(dateTime, 1);

        listToUpdate.addAll(list);
        listToUpdate.addAll(list1);
        listToUpdate.addAll(list3);

        for (Voucher v : listToUpdate) {
            if (list.contains(v)) {
                v.setStatus(3);
            }
            if (list1.contains(v)) {
                v.setStatus(2);
            }
            if (list3.contains(v)) {
                v.setStatus(1);
            }
        }
        return voucherRepository.saveAll(listToUpdate);
    }

    @Override
    public VoucherResponse getOne(Integer code) {
        return voucherRepository.getOneVoucher(code);
    }

    @Override
    public Voucher addVoucher( CreateVoucherRequest request) {
        Voucher voucher = Voucher.builder()
                .code(request.getCode())
                .name(request.getName())
                .dateStart(request.getDateStart())
                .dateEnd(request.getDateEnd())
                .valueVoucher(request.getValueVoucher())
                .typeVoucher(request.getTypeVoucher())
                .valueMinimum(request.getValueMinimum())
                .valueMaximum(request.getValueMaximum())
                .quantity(request.getQuantity())
                .conditionsApply(request.getConditionsApply())
                .build();
        voucher.setDateCreate(new Date());
        voucher.setDateUpdate(new Date());
        voucher.setStatus(0);
        return voucherRepository.save(voucher);
    }

    @Override
    public Voucher updateVoucher(UpdateVoucherRequest request, Integer id) {
        Voucher voucher = voucherRepository.findById(id).get();
        System.out.println(voucher);
        System.out.println("TTTTTT" + request);
        if (voucher != null) {
            voucher.setCode(request.getCode());
            voucher.setName(request.getName());
            voucher.setDateStart(request.getDateStart());
            voucher.setDateEnd(request.getDateEnd());
            voucher.setValueVoucher(request.getValueVoucher());
            voucher.setValueMaximum(request.getValueMaximum());
            voucher.setValueMinimum(request.getValueMinimum());
            voucher.setQuantity(request.getQuantity());
            voucher.setTypeVoucher(request.getTypeVoucher());
            voucher.setConditionsApply(request.getConditionsApply());
            voucher.setStatus(request.getStatus());
            return voucherRepository.save(voucher);
        }

        return null;
    }

    @Override
    public Boolean deleteVoucher(Integer id) {
        Voucher voucher = voucherRepository.findById(id).get();
        if (voucher != null) {
            voucherRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Boolean changeStatus(Integer id) {
        return null;
    }

    @Override
    public List<Voucher> getAll(FindVoucherRequest request) {
        Specification<Voucher> spec = (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (request.getCode() != null) {
                predicates.add(criteriaBuilder.equal(root.get("code"), request.getCode()));
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

        List<Voucher> voucherPage = voucherRepository.findAllVoucher(request);
         return voucherPage;
    }

    @Override
    public Voucher findByIdVoucher(Integer id) {
        return voucherRepository.findById(id).orElse(null);
    }

    @Override
    public List<Voucher> getVoucher(Voucher voucher) {
        return voucherRepository.getVoucherGiamGia(voucher);
    }

    @Override
    public List<Voucher> getVoucherFreeShip(Voucher voucher) {
        return voucherRepository.getVoucherFreeShip(voucher);
    }

    @Override
    public List<Voucher> searchVoucher(String codeVoucher) {
        return voucherRepository.searchVoucher(codeVoucher);
    }

    @Override
    public List<Voucher> searchNoDate(String key, String status) {
        return voucherRepository.searchNoDate(key, status);
    }
    @Override
    public List<Voucher> searchWithDate(String key, String status, LocalDate dateStart, LocalDate dateEnd) {
        return voucherRepository.searchWithDate(key, status, dateStart, dateEnd);
    }


}
