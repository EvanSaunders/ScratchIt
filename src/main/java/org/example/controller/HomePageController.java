package org.example.controller;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomePageController {
    @GetMapping("/")
    public String homePage() {
        return "homePage";
    }

    @GetMapping("/createCard")
    public String createCard() {
        return "createCardPage";
    }

    @GetMapping("/secured")
    public String secured(){
        return "hello secured";
    }
    //Do /error
}
