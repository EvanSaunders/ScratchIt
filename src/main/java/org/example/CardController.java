package org.example;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.time.Year;
@RestController
public class CardController {
    @GetMapping(path = "/cardGenerator")
    @ResponseBody
    public String cardGenerator(
            @RequestParam("email") String email,
            @RequestParam("name") String name,
            @RequestParam("message") String message,
            @RequestParam("numToSend") int numToSend,
            @RequestParam("chanceToWin") int chanceToWin) {



        //return driverService.generateDisplayByYearHTML(year);
        return "homePage";
    }
}
