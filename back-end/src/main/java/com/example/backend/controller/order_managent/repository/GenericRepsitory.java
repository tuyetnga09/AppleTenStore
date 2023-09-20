package com.example.backend.controller.order_managent.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.NoRepositoryBean;

import java.io.Serializable;
import java.util.List;

@NoRepositoryBean
public interface GenericRepsitory<T, ID extends Serializable> {
    Page<T> findAll(Pageable pageable);

    List<T> findAll();

    T findOneById(ID id);

    T save(T entity) throws Exception;

    T update(T entity) throws Exception;

    void delete(T entity) throws Exception;

    void deleteById(ID id) throws Exception;

    String getMaxEntityCodeByClass();
}
