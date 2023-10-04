package com.example.backend.repository.impl;


import com.example.backend.controller.voucher_managment.model.request.FindVoucherRequest;
import com.example.backend.entity.Voucher;
import com.example.backend.repository.CustomVoucherRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Order;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CustomVoucherRepositoryImpl implements CustomVoucherRepository {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Voucher> findAll(Pageable pageable, FindVoucherRequest request) {
        List<Voucher> vouchers = null;
        Long totalElements = 0L;
        try (EntityManager entityManager = this.entityManager) {
            CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
            CriteriaQuery<Voucher> criteriaQuery = criteriaBuilder.createQuery(Voucher.class);



            Root<Voucher> root = criteriaQuery.from(Voucher.class);
            criteriaQuery.select(root);

            Path<Object> sortByField = root.get("personCreate");
            Order orderByAscending = criteriaBuilder.desc(sortByField);
            criteriaQuery.orderBy(orderByAscending);

            CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(long.class);
            Root<Voucher> countRoot = countQuery.from(Voucher.class);

            countQuery.select(criteriaBuilder.count(countRoot));
            List<Predicate> predicates = new ArrayList<>();

            List<Predicate> countPredicates = new ArrayList<>();
            //Khi nao tim kiem thi cho vao
//            Predicate predicate = getPredicate(root, Voucher.class, criteriaBuilder, request.getKeyword());
//            Predicate countPredicate = getPredicate(countRoot, Voucher.class, criteriaBuilder, request.getKeyword());
//
//            predicates.add(predicate);
//            countPredicates.add(countPredicate);

            if (request.getStatus() != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), request.getStatus()));
                countPredicates.add(criteriaBuilder.equal(countRoot.get("status"), request.getStatus()));
            }

            if (request.getQuantity() != null) {
                predicates.add(criteriaBuilder.equal(root.get("quantity"), request.getQuantity()));
                countPredicates.add(criteriaBuilder.equal(countRoot.get("quantity"), request.getQuantity()));
            }

            Expression<Date> expression2 = criteriaBuilder.function("DATE", Date.class, countRoot.get("dateStart"));
            Expression<Date> expression3 = criteriaBuilder.function("DATE", Date.class, countRoot.get("dateEnd"));
            Expression<Date> expression = criteriaBuilder.function("DATE", Date.class, root.get("dateStart"));
            Expression<Date> expression1 = criteriaBuilder.function("DATE", Date.class, root.get("dateEnd"));
            if (request.getDateStart() != null && request.getEndDate() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(expression, request.getDateStart()));
                predicates.add(criteriaBuilder.lessThanOrEqualTo(expression1, request.getEndDate()));
                countPredicates.add(criteriaBuilder.greaterThanOrEqualTo(expression2, request.getDateStart()));
                countPredicates.add(criteriaBuilder.lessThanOrEqualTo(expression3, request.getEndDate()));
            } else if (request.getDateStart() != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(expression, request.getDateStart()));
                countPredicates.add(criteriaBuilder.greaterThanOrEqualTo(expression2, request.getDateStart()));
            } else if (request.getEndDate() != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(expression1, request.getEndDate()));
                countPredicates.add(criteriaBuilder.lessThanOrEqualTo(expression3, request.getEndDate()));
            }

            criteriaQuery.where(predicates.toArray(new Predicate[0]));
            countQuery.where(countPredicates.toArray(new Predicate[0]));

            TypedQuery<Voucher> typedQuery =
                    entityManager.createQuery(criteriaQuery).setFirstResult(pageable.getPageNumber() * pageable.getPageSize()).setMaxResults(pageable.getPageSize());
            vouchers = typedQuery.getResultList();
            totalElements = entityManager.createQuery(countQuery).getSingleResult();

        } catch (Exception e) {
            throw e;
        }
        return new PageImpl<>(vouchers, pageable, totalElements);
    }

    protected Predicate getPredicate(Root<Voucher> root, Class<?> entity, CriteriaBuilder criteriaBuilder, String keyword) {
        Field[] fields = entity.getDeclaredFields();
        List<Predicate> predicates = new ArrayList<>();
        for (Field field : fields) {
            predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get(field.getName()).as(String.class)), "%" + keyword.toLowerCase() + "%"));
        }
        return criteriaBuilder.or(predicates.toArray(new Predicate[0]));
    }

}
