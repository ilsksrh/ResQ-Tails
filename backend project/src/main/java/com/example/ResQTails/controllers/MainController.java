package com.example.ResQTails.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    @RequestMapping("/hello")
        public String getHellloPage(){
        return "hello.html";
        }
}
