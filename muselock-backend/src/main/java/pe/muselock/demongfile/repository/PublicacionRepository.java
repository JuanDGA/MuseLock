package pe.muselock.demongfile.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pe.muselock.demongfile.entity.PublicacionEntity;

@Repository
public interface PublicacionRepository extends JpaRepository<PublicacionEntity, Long>{
    
} 
