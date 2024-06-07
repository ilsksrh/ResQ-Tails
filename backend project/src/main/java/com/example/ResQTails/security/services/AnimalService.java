package com.example.ResQTails.security.services;

import com.example.ResQTails.models.Animal;
import com.example.ResQTails.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AnimalService {

    @Autowired
    private AnimalRepository animalRepository;

    public Animal saveOrUpdateAnimal(Animal animal) {
        return animalRepository.save(animal);
    }

    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    public Animal getAnimalById(Long id) {
        return animalRepository.findById(id).orElse(null);
    }

    public Animal updateAnimal(Long id, Animal updatedAnimal) {
        updatedAnimal.setAnimalId(id);
        return animalRepository.save(updatedAnimal);
    }

    public void deleteAnimal(Long id) {
        animalRepository.deleteById(id);
    }
}