package org.example;



import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class Main {
    public static void main(String args[])  //static method
    {
        SpringApplication.run(Main.class, args);
    }
  //  @Bean
  //  CommandLineRunner commandLineRunner(CardRepository cardRepository){
      //  return args ->{
       //     Card examp = new Card(
       //             "ex@gmail.com",
       //             "John Doe",
       //             "Have fun",
       //             true);
      //      cardRepository.save(examp);
     //   };
    //}

}

