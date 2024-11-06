---
id: java-spring-maven
slug: /java-spring-maven
title: Maven Spring MVC
date: 2024-11-04
authors: Hoo
tags: [java]
keywords: [java]
---

## Maven Spring MVC Basics

---------------------------------------------

1. Create a **Maven / Spring MVC** project

2. If you encounter a situation where **org.springframework** cannot be installed, [watch Install Tomcat before you can install it](https://www.youtube.com/watch?v=c3dIEGXLgC4)

3. Configuration files / code

   **pom.xml**

```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
  </properties>

  <dependencies>

    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>3.8.1</version>
      <scope>test</scope>
    </dependency>

    <!-- Spring Lombok -->
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <version>1.18.34</version>
    </dependency>

    <!-- Spring springframework -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-framework-bom</artifactId>
      <version>5.3.32</version>
      <type>pom</type>
      <scope>import</scope>
    </dependency>

    <!-- Spring context -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>6.1.13</version>
    </dependency>

    <!-- Spring Core -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-core</artifactId>
      <version>6.1.13</version>
    </dependency>

    <!-- Spring Web MVC -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>6.1.13</version>
    </dependency>

    <!-- Spring Web -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-web</artifactId>
      <version>6.1.13</version>
    </dependency>
      
      <!-- Fastjson -->
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>fastjson</artifactId>
      <version>2.0.51</version>
    </dependency>
      
    <!-- Servlet -->
    <dependency>
      <groupId>jakarta.servlet</groupId>
      <artifactId>jakarta.servlet-api</artifactId>
      <version>5.0.0</version>
      <scope>provided</scope>
    </dependency>

    <!-- JSTL 1 -->
    <dependency>
      <groupId>jakarta.servlet.jsp.jstl</groupId>
      <artifactId>jakarta.servlet.jsp.jstl-api</artifactId>
      <version>2.0.0</version>
    </dependency>

    <!-- JSTL 2 -->
    <dependency>
      <groupId>org.glassfish.web</groupId>
      <artifactId>jakarta.servlet.jsp.jstl</artifactId>
      <version>2.0.0</version>
    </dependency>

    <!-- JSTL 3 -->
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
    </dependency>
      
    <!-- apache fileUpload File upload -->
    <dependency>
      <groupId>commons-fileupload</groupId>
      <artifactId>commons-fileupload</artifactId>
      <version>1.5</version>
    </dependency>

    <!-- apache fileUpload File upload -->
    <dependency>
      <groupId>commons-io</groupId>
      <artifactId>commons-io</artifactId>
      <version>2.17.0</version>
    </dependency>
      
    <!-- JSR-303 Use Import-->
    <!-- JSR-303 -->
    <dependency>
      <groupId>org.hibernate</groupId>
      <artifactId>hibernate-validator</artifactId>
      <version>8.0.1.Final</version>
    </dependency>

    <!-- JSR-303 -->
    <dependency>
      <groupId>javax.validation</groupId>
      <artifactId>validation-api</artifactId>
      <version>2.0.1.Final</version>
    </dependency>

    <!-- JSR-303 -->
    <dependency>
      <groupId>org.jboss.logging</groupId>
      <artifactId>jboss-logging</artifactId>
      <version>3.5.3.Final</version>
    </dependency>

    <!-- JSR-303 / JDK9Above Installation -->
    <dependency>
      <groupId>javax.xml.bind</groupId>
      <artifactId>jaxb-api</artifactId>
      <version>2.4.0-b180830.0359</version>
    </dependency>

    <!-- JAXB API -->
    <dependency>
      <groupId>javax.xml.bind</groupId>
      <artifactId>jaxb-api</artifactId>
      <version>2.3.1</version>
    </dependency>

    <!-- JAXB Implementation -->
    <dependency>
      <groupId>org.glassfish.jaxb</groupId>
      <artifactId>jaxb-runtime</artifactId>
      <version>2.3.1</version>
    </dependency>

    <!-- JSR-303 / JDK9Above Installation -->
    <dependency>
      <groupId>javax.activation</groupId>
      <artifactId>activation</artifactId>
      <version>1.1.1</version>
    </dependency>
    <!-- JSR-303 Use Import End -->

</dependencies>

<build>
    <finalName>springMVC</finalName>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.13.0</version>
        <configuration>
          <source>1.8</source>
          <target>1.8</target>
          <compilerArgs>
            <arg>-parameters</arg>
          </compilerArgs>
        </configuration>
      </plugin>
    </plugins>
</build>
```



**resource/spring.xml**

```jsp
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="
           http://www.springframework.org/schema/beans
           http://www.springframework.org/schema/beans/spring-beans.xsd
           http://www.springframework.org/schema/context
           http://www.springframework.org/schema/context/spring-context.xsd
           http://www.springframework.org/schema/mvc
           http://www.springframework.org/schema/mvc/spring-mvc.xsd">

    <!--Configuring automatic scanning-->
    <context:component-scan base-package="com.xs"/>

    <!--View Resolver-->
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/"/>
        <property name="suffix" value=".jsp"/>
    </bean>

    <bean id="conversionService" class="org.springframework.context.support.ConversionServiceFactoryBean">
        <property name="converters">
            <list>
                <bean class="com.xs.converter.DateConverter">
                    <constructor-arg type="java.lang.String" value="yyyy-MM-dd"/>
                </bean>
                <bean class="com.xs.converter.StudentConverter"/>
            </list>
        </property>
    </bean>

    <!-- Enable annotation-driven Spring MVC -->
    <mvc:annotation-driven conversion-service="conversionService">
        <mvc:message-converters>
            <bean class="org.springframework.http.converter.StringHttpMessageConverter">
                <property name="supportedMediaTypes" value="text/html;charset=UTF-8"/>
            </bean>
            <!-- Fastjson -->
            <bean class="com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter"/>
        </mvc:message-converters>
    </mvc:annotation-driven>

    <!-- Image upload configuration -->
    <bean id="multipartResolver" class="org.springframework.web.multipart.support.StandardServletMultipartResolver"/>
    
</beans>
```

​      **webapp/WEB-INF/web.xml** (If you are using MVC)

```jsp
<!DOCTYPE web-app PUBLIC
 "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
 "http://java.sun.com/dtd/web-app_2_3.dtd" >

<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
         http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">
  <display-name>Archetype Created Web Application</display-name>

  <!-- Display Chinese -->
  <filter>
    <filter-name>encodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
  </filter>

  <filter-mapping>
    <filter-name>encodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>

  <!-- When you can use Form，PUT，DELETE -->
  <filter>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
  </filter>

  <filter-mapping>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>

  <servlet>
    <servlet-name>springmvc</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath:spring.xml</param-value>
    </init-param>

    <!-- Image upload configuration -->
    <load-on-startup>1</load-on-startup>
    <multipart-config>
      <max-file-size>10485760</max-file-size>
      <max-request-size>10485760</max-request-size>
      <file-size-threshold>0</file-size-threshold>
    </multipart-config>
    
  </servlet>

  <servlet-mapping>
    <servlet-name>springmvc</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>

  <!-- Spring MVC Static resource access -->
  <servlet-mapping>
    <servlet-name>default</servlet-name>
    <url-pattern>*.js</url-pattern>
  </servlet-mapping>

  <!-- Spring MVC Display image format -->
  <servlet-mapping>
    <servlet-name>default</servlet-name>
    <url-pattern>*.png</url-pattern>
  </servlet-mapping>

  <!-- Spring MVC Display image format -->
  <servlet-mapping>
    <servlet-name>default</servlet-name>
    <url-pattern>*.jpg</url-pattern>
  </servlet-mapping>

  <!-- Spring MVC Display image format -->
  <servlet-mapping>
    <servlet-name>default</servlet-name>
    <url-pattern>*.jpeg</url-pattern>
  </servlet-mapping>

</web-app>
```





## Start learning

### @Controller

### @RequestMapping("/index")

```java
package com.xs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/hello")
public class HelloHandler {

    @RequestMapping("/index")
    public String index(){
        System.out.println("Receiving Requests");
        // Back View
        return "index";
    }

}
```

**Method**

```
@RequestMapping(value = "/index", method = RequestMethod.POST)
```

**Params**

```
@RequestMapping(value = "/index", method = RequestMethod.POST, params = "id")
```

```
@RequestMapping(value = "/index", method = RequestMethod.POST, params = {"id", "name", "age"})
```

URL**?id=1&name=Hoo**,  x

```
@RequestMapping(value = "/index", method = RequestMethod.POST, params = {"id=1", "name=Hoo"})
```



### Rest style

RestFul function makes the code more convenient and faster

```java
	@RequestMapping("/index/{id}/{name}")
    public String restfulWay(Integer id, String name){
        System.out.println(id + " " + name);
        // Back View
        return "index";
   	}
```

JSP page forwarding and redirection

```java
@RequestMapping("/restful/{id}/{name}")
    public String restfulWay(Integer id, String name){
        System.out.println(id + " " + name);
        // Back View
        return "redirect:/index.jsp";
    }
```

或

```java
return "forward:/index.jsp";
```



### Spring MVC Data Binding

**`required = true`** indicates that this request parameter is required, that is, if the client request does not contain this parameter, Spring MVC will throw an exception (usually `MissingServletRequestParameterException`) and return an error response.

```java
    @RequestMapping("/baseType")
    @ResponseBody
    public String baseType(int id){
        return "id:"+id;
    }

    @RequestMapping("/baseType")
    @ResponseBody
    public String packageType(@RequestParam(value="id", required = true, defaultValue = "0") int id){
        return "id:"+id;
    }
```



### Arrays

```java
@RequestMapping("/arrayType")
    @ResponseBody
    public String arrayType(String[] names){
        StringBuffer s = new StringBuffer();
        for(String str:names){
            s.append(str).append(" ");
        }
        return "names:"+s.toString();
    }
```



### POJO

```java
package com.xs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer id;
    private String name;
}
```

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <form action="hello/test" method="post">
        <table>
            <tr>
                <td>serial number：</td>
                <td>
                    <input type="text" name="id"/>
                </td>
            </tr>
            <tr>
                <td>name：</td>
                <td>
                    <input type="text" name="name"/>
                </td>
            </tr>
            <tr>
                <td>
                    <input type="submit" value="submit"/>
                </td>
            </tr>
        </table>
    </form>
</head>
<body>

</body>
</html>
```

```java
@RequestMapping(value = "/add", method = RequestMethod.POST)
    public String add(User user){
        System.out.println(user);
        // Back View
        return "index";
    }

@RequestMapping(value = "/add", method = RequestMethod.POST)
@ResponseBody
    public String add(User user){
        return user.toString()
    }
```



### List

1.

```java
@Controller
public class StudentController {

    @RequestMapping("/getStudents")
    public String getStudents(HttpServletRequest request) {
        // Create a list of students
        List<Student> students = new ArrayList<>();
        students.add(new Student(1, "Alice"));
        students.add(new Student(2, "Bob"));
        students.add(new Student(3, "Charlie"));

        // Set the student list as a request attribute and pass it to the JSP
        request.setAttribute("students", students);

        // Returns the view name (e.g. students.jsp)
        return "students";
    }
}
```

2.

```java
@RequestMapping(value = "/listType", method = RequestMethod.POST)
    @ResponseBody
    public String listType(UserList userList){
        StringBuffer stri = new StringBuffer();
        for(User u:userList.getUsers()){
            stri.append(u);
        }
        return "user" + stri.toString();
    }
```

```java
package com.xs.entity;

import lombok.Data;

import java.util.List;

@Data
public class UserList {
    private List<User> users;
}
```

```java
package com.xs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Integer id;
    private String name;
}
```

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

    <form action="hello/listType" method="post">
        user1 ID: <input type="text" name="users[0].id"/><br/>
        user1 Name: <input type="text" name="users[0].name"/><br/>

        user2 ID: <input type="text" name="users[1].id"/><br/>
        user2 Name: <input type="text" name="users[1].name"/><br/>

        user3 ID: <input type="text" name="users[2].id"/><br/>
        user3 Name: <input type="text" name="users[2].name"/><br/>

        <input type="submit" value="submit"/>
    </form>

</body>
</html>
```

`List.of` The created list is immutable, which means once created its elements cannot be added, removed, or changed.

```java
List<String> immutableList = List.of("apple", "banana", "cherry");
```

```java
List<Map.Entry<String, Integer>> keyValuePairs = List.of(
                Map.entry("1", 101),
                Map.entry("2", 102)
        );
```

```java
List<UserEntity> userdata = List.of(
                new UserEntity(101, "avatar1.png", "John", "0", "123 Street", 5),
                new UserEntity(102, "avatar2.png", "Jane", "1", "456 Avenue", 10)
        );
```



### Import Jquery files or others

Need to click Build -> Rebuild Project

Repackage the project to target

### Spring MVC view parsing

EL expression

```jsp
<%@ page isELIgnored="false" %>
```

Passing data to the view, but `Model` is the Spring Framework's recommended way, with more power and flexibility.

```java
@RequestMapping("/map")
    public String map(Map<String, Object> map){
        User u = new User();
        u.setId(1);
        u.setName("Hoo");
        map.put("user", u); // Store the User object in the map with the key "user"
        return "show"; // Returns the view name "show"
    }

    @RequestMapping("/model")
    public String model(Model model){
        User u = new User();
        u.setId(1);
        u.setName("Hoo");
        model.addAttribute("user",u); // Store the User object in the model with the key "user"
        return "show"; // Returns the view name "show"
    }
```

```jsp
<p>User ID: ${user.id}</p>
<p>User Name: ${user.name}</p>
```

ModelAndView

`ModelAndView` is a class in Spring MVC that handles model data and view names. It combines the functions of models and views, allowing you to set model data and returned views at the same time. The method of using `ModelAndView` is usually clearer and more flexible than using `Map` or `Model` alone.

`ModelAndView` allows adding multiple model objects through method chaining, for example:

```java
mav.addObject("user", u).addObject("age", 25);
```

```java
@RequestMapping("/mav")
    public ModelAndView modelAndView(){
        ModelAndView mav = new ModelAndView(); // Creating a ModelAndView Object
        User u = new User(); //Creating a User Object
        u.setId(1); // Setting User ID
        u.setName("Hoo"); // Set User Name
        mav.addObject("user", u); // Store the User object into mav with the key "user"
        mav.setViewName("show"); // Set the view name to "show"
        return mav; // Returns a ModelAndView object
    }
```

HttpServletRequest

```java
@RequestMapping("/request")
    public String request(HttpServletRequest request){
        User u = new User(); // Creating a User Object
        u.setId(1); // Setting User ID
        u.setName("Hoo"); // Set User Name
        request.setAttribute("user", u); // Store the User object in the request with the key"user"
        return "show"; // Returns the view name "show"
    }
```

@ModelAttribute

```java
@RequestMapping("/modelAttribute")
    public String modelAttribute(){
        return "show";
    }

    @ModelAttribute
    public User getUser(){
        User u = new User();
        u.setId(1);
        u.setName("Hoo");
        return u;
    }
```

HttpSession

```java
@RequestMapping("/session")
public String session(HttpSession session) {
    User u = new User();
    u.setId(1);
    u.setName("Hoo");
    session.setAttribute("user", u); // Store the User object in the session with the key"user"
    return "show"; // Returns the view name "show"
}
```

```jsp
<p>ID: ${sessionScope.user.id}</p>
<p>Name: ${sessionScope.user.name}</p>
```



### Spring MVC custom data type converter

1. Create a custom type converter

   ```java
   package com.xs.converter;
   
   import org.springframework.core.convert.converter.Converter;
   
   import java.text.ParseException;
   import java.text.SimpleDateFormat;
   import java.util.Date;
   
   public class DateConverter implements Converter<String, Date> {
   

This DateConverter class is a custom type converter designed to convert a String date string to a Date object.

It implements the Converter String, Date interface, which means it can convert a String to a Date.

```java
private String pattern;

public DateConverter(String pattern){
    this.pattern = pattern;
}

@Override
public Date convert(String source) {
    SimpleDateFormat simple = new SimpleDateFormat(this.pattern);
    try{
        return simple.parse(source);
    }catch (ParseException e){
        e.printStackTrace();
    }
   return null;
}
```

   }
   ```java

   2. Configuration spring.xml

      ```xml
      <bean id="conversionService" class="org.springframework.context.support.ConversionServiceFactoryBean">
              <property name="converters">
                  <list>
                      <bean class="com.xs.converter.DateConverter">
                          <constructor-arg type="java.lang.String" value="yyy-MM-dd"/>
                      </bean>
                  </list>
              </property>
          </bean>
   ```

~~~java
  pom.xml

  ```xml
  <build>
      <finalName>springMVC_03</finalName>
      <plugins>
        <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-compiler-plugin</artifactId>
          <version>3.13.0</version>
          <configuration>
            <source>1.8</source>
            <target>1.8</target>
            <compilerArgs>
              <arg>-parameters</arg>
            </compilerArgs>
          </configuration>
        </plugin>
      </plugins>
    </build>
  ```
~~~


~~~java
  3. ```java
     @Controller
     @RequestMapping("/converter")
     public class ConverterHandler {
     
         @RequestMapping("/date")
         @ResponseBody
         public String date(@RequestParam("date") Date date) {
             return date.toString();
         }
     
     }
     ```

     ```jsp
     <%@ page contentType="text/html;charset=UTF-8" language="java" %>
     <html>
     <head>
         <title>Title</title>
     </head>
     <body>
     
     <form action="converter/date" method="post">
         <input type="text" name="date"/> (2020-01-01)
         <input type="submit" value="submit"/>
     </form>
     
     </body>
     </html>
     ```      
~~~

### Student Class Custom Converters

```java
package com.xs.converter;

import com.xs.entity.Student;
import org.springframework.core.convert.converter.Converter;

public class StudentConverter implements Converter<String, Student>{

    @Override
    public Student convert(String source) {
        String[] a = source.split("-");
        Student student = new Student();
        student.setId(Integer.parseInt(a[0]));
        student.setName(a[1]);
        student.setAge(Integer.parseInt(a[2]));
        return student;
    }
}
```

Configuration spring.xml

```java
<bean id="conversionService" class="org.springframework.context.support.ConversionServiceFactoryBean">
        <property name="converters">
            <list>
                <bean class="com.xs.converter.DateConverter">
                    <constructor-arg type="java.lang.String" value="yyyy-MM-dd"/>
                </bean>
                // Student Configuration
                <bean class="com.xs.converter.StudentConverter"/>
            </list>
        </property>
    </bean>
```

Using Handler

```java
@RequestMapping("/student")
    @ResponseBody
    public Student student(Student s, HttpServletResponse res) {
        res.setCharacterEncoding("UTF-8");
        return s;
    }
```



### Spring MVC and RESTful integration

1. Handler

   ```java
   @PutMapping("/update")
       @ResponseBody
       public String update(HttpServletResponse res){
           res.setCharacterEncoding("UTF-8");
           return "Update Received";
       }
   
       @DeleteMapping("/delete")
       @ResponseBody
       public String delete(HttpServletResponse res){
           res.setCharacterEncoding("UTF-8");
           return "Delete Received";
       }
   ```

   2. Configuration, already configured in Web.xml

      ```xml
      <filter>
          <filter-name>HiddenHttpMethodFilter</filter-name>
          <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
        </filter>
      
        <filter-mapping>
          <filter-name>HiddenHttpMethodFilter</filter-name>
          <url-pattern>/*</url-pattern>
        </filter-mapping>
      ```
      
      3. JSP
      
         ```jsp
         <form action="rest/update" method="post">
             <input type="hidden" name="_method" value="PUT"/>
             <input type="submit" value="PUT 提交"/>
         </form>
         
         <form action="rest/delete" method="post">
             <input type="hidden" name="_method" value="DELETE"/>
             <input type="submit" value="DELETE 提交"/>
         </form>
         ```
      
         

### Practice Code CRUD

1. Course Entity Class

```java
package com.xs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    private  Integer id;
    private String name;
    private Double price;
}
```

2，CourseRepository

```java
package com.xs.repository;

import com.xs.entity.Course;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Repository
public class CourseRepository {

    private Map<Integer, Course> courseMap;

    public CourseRepository(){
        courseMap = new HashMap<>();
        courseMap.put(1,new Course(1,"Java Base",Double.parseDouble("500")));
        courseMap.put(2,new Course(2,"Java Avanced",Double.parseDouble("700")));
        courseMap.put(3,new Course(3,"Etrepreneur",Double.parseDouble("800")));

    }

    public Collection<Course> findAll(){
        return courseMap.values();
    }

    public Course findById(Integer id){
        return courseMap.get(id);
    }

    public void saveOrUpdate(Course course){
        courseMap.put(course.getId(),course);
    }

    public void deleteById(Integer id){
        courseMap.remove(id);
    }

}
```

3，Configure JSP index.jsp

```jsp
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isELIgnored="false" %>
```

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<html>
<head>
  <title>Title</title>
</head>
<body>

<table>
  <tr>
    <th>id/th>
    <th>nameh>
    <th>price
    <th>operate</th>
  </tr>
  <c:forEach items="${list}" var="course">
    <tr>
      <td>${course.id}</td>
      <td>${course.name}</td>
      <td>${course.price}</td>
      <td>
        <form action="${pageContext.request.contextPath}/course/deleteById/${course.id}" method="post">
          <input type="hidden" name="_method" value="DELETE" />
          <input type="submit" value="delete
        </form>
        <a href="${pageContext.request.contextPath}/course/findById/${course.id}">edit>
      </td>
    </tr>
  </c:forEach>
</table>

</body>
</html>
```

4，Handler

```java
package com.xs.controller;

import com.xs.entity.Course;
import com.xs.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/course")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    @PostMapping("/save")
    public String save(Course c){
        courseRepository.saveOrUpdate(c);
        return "redirect:/course/findAll";
    }

    @GetMapping("/findAll")
    public ModelAndView findAll(){
        ModelAndView mav = new ModelAndView();
        mav.setViewName("index");
        mav.addObject("list",courseRepository.findAll());
        return mav;
    }

    @DeleteMapping("/deleteById/{id}")
    public String deleteById(@PathVariable("id") Integer id){
        courseRepository.deleteById(id);
        return "redirect:/course/findAll";
    }

    @GetMapping("/findById/{id}")
    public ModelAndView findById(@PathVariable("id") Integer id){
        ModelAndView mav = new ModelAndView();
        mav.setViewName("edit");
        mav.addObject("course",courseRepository.findById(id));
        return mav;
    }

    @PutMapping("/update")
    public String update(Course c){
        courseRepository.saveOrUpdate(c);
        return "redirect:/course/findAll";
    }

}
```

5，save.jsp

```jsp
<%--
  Created by IntelliJ IDEA.
  User: Hoo
  Date: 10/19/2024
  Time: 10:09 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<form action="course/save" method="post">
    <table>
        <tr>
            <td>Course Code：</td>
            <td>
                <input type="text" name="id"/>
            </td>
        </tr>
        <tr>
            <td>Course Title：</td>
            <td>
                <input type="text" name="name"/>
            </td>
        </tr>
        <tr>
            <td>Course Prices：</td>
            <td>
                <input type="text" name="price"/>
            </td>
        </tr>
        <tr>
            <td>
                <input type="submit" value="Submit"
            </td>
        </tr>
        <tr>
            <td>
                <input type="reset" value="Reset
            </td>
        </tr>
    </table>
</form>

</body>
</html>
```

6，edit.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<form action="${pageContext.request.contextPath}/course/update" method="post">
    <input type="hidden" name="_method" value="PUT"/>
    <table>
        <tr>
            <td>id:</td>
            <td>
                <input type="text" name="id" readonly value="${course.id}"/>
            </td>
        </tr>
        <tr>
            <td>name：</td>
            <td>
                <input type="text" name="name" value="${course.name}"/>
            </td>
        </tr>
        <tr>
            <td>price：</td>
            <td>
                <input type="text" name="price" value="${course.price}"/>
            </td>
        </tr>
        <tr>
            <td>
                <input type="submit" value="edit"/>
            </td>
        </tr>
    </table>
</form>

</body>
</html>
```



### Spring MVC Realize image file upload and download

Configuration

1，web.xml

```xml
<!-- Spring MVC Display image format -->
  <servlet-mapping>
    <servlet-name>default</servlet-name>
    <url-pattern>*.png</url-pattern>
  </servlet-mapping>

  <!-- Spring MVC Display image format -->
  <servlet-mapping>
    <servlet-name>default</servlet-name>
    <url-pattern>*.jpg</url-pattern>
  </servlet-mapping>

  <!-- Spring MVC Display image format -->
  <servlet-mapping>
    <servlet-name>default</servlet-name>
    <url-pattern>*.jpeg</url-pattern>
  </servlet-mapping>
```

2，pom.xml

```xml
<!-- apache fileUpload File upload -->
    <dependency>
      <groupId>commons-fileupload</groupId>
      <artifactId>commons-fileupload</artifactId>
      <version>1.5</version>
    </dependency>

    <!-- apache fileUpload File upload -->
    <dependency>
      <groupId>commons-io</groupId>
      <artifactId>commons-io</artifactId>
      <version>2.17.0</version>
    </dependency>
```

3，spring.xml

```xml
<!-- Image upload configuration -->
    <bean id="multipartResolver" class="org.springframework.web.multipart.support.StandardServletMultipartResolver"/>
```

1，upload.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<form action="/file/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="img"/>
    <input type="submit" value="File upload"/>
</form>
<img src="${pageContext.request.contextPath}${src}" alt="Uploaded Image" />

</body>
</html>
```

2，Controller

```java
package com.xs.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Controller
@RequestMapping("/file")
public class FileHandler {


    @PostMapping("/upload")
    public String upload(@RequestParam("img") MultipartFile img, HttpServletRequest req) {

        if(img.getSize() > 0){
            String path = req.getSession().getServletContext().getRealPath("file");
            File directory = new File(path);

            // Check if the target directory exists and create it if it does not exist
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Dealing with file name conflicts
            String fileName = img.getOriginalFilename();
            String newFileName = System.currentTimeMillis() + "_" + fileName; // Add timestamp
            File file = new File(directory, newFileName);

            try {
                img.transferTo(file);
                req.setAttribute("src","/file/" + newFileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return "upload"; // The name of the view returned
    }

}
```

### Upload multiple image files

1，uploads.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page isELIgnored="false" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<form action="/file/uploads" method="post" enctype="multipart/form-data">
    file1:<input type="file" name="imgs"/><br/>
    file2:<input type="file" name="imgs"/><br/>
    file3:<input type="file" name="imgs"/><br/>

    <input type="submit" value="Submit"/>
</form>

<c:forEach items="${list}" var="path">
    <img width="300px" src="${pageContext.request.contextPath}${path}"/>
</c:forEach>

</body>
</html>
```

2，Controller

```java
@PostMapping("/uploads")
    public String uploads(@RequestParam("imgs") MultipartFile[] imgs, HttpServletRequest req) {

        List<String> pathList = new ArrayList<>();

        for(MultipartFile img:imgs){
            String path = req.getSession().getServletContext().getRealPath("file");
            File directory = new File(path);

            // Check if the target directory exists and create it if it does not exist
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Dealing with file name conflicts
            String fileName = img.getOriginalFilename();
            String newFileName = System.currentTimeMillis() + "_" + fileName; // Add timestamp
            File file = new File(directory, newFileName);

            try {
                img.transferTo(file);
                pathList.add("/file/" + newFileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        req.setAttribute("list",pathList);
        return "uploads"; // The name of the view returned
    }
```



### Image File Download

1，download.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<a href="/file/download?fileName=1729361780490_1.jpeg">1</a><br/>
<a href="/file/download?fileName=1729361780494_2.jpg">2</a><br/>
<a href="/file/download?fileName=1729361780510_3.png">3</a><br/>

</body>
</html>
```

2，Controller

```java
 @GetMapping("/download")
    public void download(String fileName, HttpServletRequest req, HttpServletResponse res){

        if(fileName != null){
            // Get the real path of the file
            String path = req.getSession().getServletContext().getRealPath("file");
            File file = new File(path, fileName);
            OutputStream outputStream = null;
            if(file.exists()){
                res.setContentType("application/force-download");
                res.setHeader("Content-Disposition","attachment;filename=" + fileName);

                try{
                    outputStream = res.getOutputStream();
                    outputStream.write(FileUtils.readFileToByteArray(file));
                    outputStream.flush();
                }
                catch (IOException e){
                    e.printStackTrace();
                }
                finally {
                    if(outputStream != null){
                        try{
                            outputStream.close();
                        }
                        catch (IOException e){
                            e.printStackTrace();
                        }
                    }
                }

            }

        }
    }
```



### Spring MVC data validation

Complex method

1. Add validation file **validation**

2. Add data Models

```java
package com.xs.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class XStudent {
    private String name;
    private String password;
}
```

3，Add XStudent data validation

```java
package com.xs.validation;

import com.xs.entity.XStudent;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

public class XStudentValidation implements Validator {

    // Checks whether this validator supports validating the given class
    @Override
    public boolean supports(Class<?> clazz) {
        return XStudent.class.equals(clazz);
    }

    // Execute validation logic
    @Override
    public void validate(Object target, Errors errors) {
        // Perform validation and add an error message if the name field is empty
        ValidationUtils.rejectIfEmpty(errors, "name", null, "Name cannot be empty");
        ValidationUtils.rejectIfEmpty(errors, "password", null, "Password cannot be empty");
    }
}
```

4，Add to ValidateHandler

```java
package com.xs.controller;

import com.xs.entity.XStudent;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/validate")
public class ValidateHandler {

    @GetMapping("/login")
    public String login(Model model){
        model.addAttribute("XStudent", new XStudent());
        return "login";
    }

    @PostMapping("/login")
    public String login(@Validated XStudent xs, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return "login";
        }
        return "success";
    }

}
```

5，Add to login.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<h1>Student Login</h1>
<form:form modelAttribute="XStudent" action="/validate/login" method="post">
    Student Name:<form:input path="name"/><form:errors path="name"/><br/>
    Student Password:<form:input path="password"/><form:errors path="password"/><br/>
    <input type="submit" value="Submit"/>
</form:form>

</body>
</html>
```

6，Add on spring.xml

```xml
<!-- XStudent Data Verification -->
    <mvc:annotation-driven validator="xstudentValidator"/>
    <bean id="xstudentValidator" class="com.xs.validation.XStudentValidation"/>
```

7，success.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<h1>success</h1>
</body>
</html>
```

Data verification Recommended method

### Annotation JSR-303

1，Import pom.ml

```xml
<!-- JSR-303 Use Import -->
    <!-- JSR-303 -->
    <dependency>
      <groupId>org.hibernate</groupId>
      <artifactId>hibernate-validator</artifactId>
      <version>8.0.1.Final</version>
    </dependency>

    <!-- JSR-303 -->
    <dependency>
      <groupId>javax.validation</groupId>
      <artifactId>validation-api</artifactId>
      <version>2.0.1.Final</version>
    </dependency>

    <!-- JSR-303 -->
    <dependency>
      <groupId>org.jboss.logging</groupId>
      <artifactId>jboss-logging</artifactId>
      <version>3.5.3.Final</version>
    </dependency>

    <!-- JSR-303 / JDK9 Above Installation -->
    <dependency>
      <groupId>javax.xml.bind</groupId>
      <artifactId>jaxb-api</artifactId>
      <version>2.4.0-b180830.0359</version>
    </dependency>

    <!-- JAXB API -->
    <dependency>
      <groupId>javax.xml.bind</groupId>
      <artifactId>jaxb-api</artifactId>
      <version>2.3.1</version>
    </dependency>

    <!-- JAXB Implementation -->
    <dependency>
      <groupId>org.glassfish.jaxb</groupId>
      <artifactId>jaxb-runtime</artifactId>
      <version>2.3.1</version>
    </dependency>

    <!-- JSR-303 / JDK9 Above Installation -->
    <dependency>
      <groupId>javax.activation</groupId>
      <artifactId>activation</artifactId>
      <version>1.1.1</version>
    </dependency>
    <!-- JSR-303 Use Import End -->
```

2，Creating Entity Classes

```java
package com.xs.entity;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.NotEmpty;

@Data
public class Account {
    @NotEmpty(message = "Username cannot be empty")
    private String username;
    @Size(min = 6, max = 20, message = "Password length is 6 - 20")
    private String password;
    @Email(regexp = "^[a-zA-Z0-9._%+-]+@gmail\\.com$", message = "Please enter a valid Gmail address")
    private String email;
    @Pattern(regexp = "^(\\+60\\d{1,2}-\\d{7}|0\\d{1,2}-\\d{7}|(\\+60\\d{1,2}|0\\d{1,2})\\d{7})$",
            message = "Please enter the correct phone number format")
    private String phone;
}
```

3，Controller

```java
@GetMapping("/register")
    public String register(Model model) {
        model.addAttribute("account", new Account()); // Use lowercase
        return "register";
    }

    @PostMapping("/register")
    public String register(@Valid Account a, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "register";
        }
        return "success";
    }
```

4，Configuration spring.xml

```xml
<mvc:annotation-driven/>
```

5，register.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<h1>User Registration</h1>
<form:form modelAttribute="account" action="/validate/register" method="post">
    User Name:<form:input path="username"/><form:errors path="username"/><br/>
    User Password:<form:input path="password"/><form:errors path="password"/><br/>
    User Mail:<form:input path="email"/><form:errors path="email"/><br/>
    User phone:<form:input path="phone"/><form:errors path="phone"/><br/>
    <input type="submit" value="Submit"/>
</form:form>

</body>
</html>
```



### Spring MVC Form Library

1，Student entity class and Address entity class

```java
package com.xs.entity2;

import lombok.Data;

import java.util.List;

@Data
public class Student {
    private Integer id;
    private String name;
    private String password;
    private Integer age;
    private String gender;
    private Address address;
    private Boolean flag;
    private List<String> hobby;
    private List<String> selectHobby;
}
```

```java
package com.xs.entity2;

import lombok.Data;

@Data
public class Address {
    private Integer id;
    private String name;
}
```

2，Handler

```java
package com.xs.controller;

import com.xs.entity2.Student;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/student")
public class StudentHandler {

    @RequestMapping("/get")
    public String get(Model model){
        Student stu = new Student();
        stu.setId(1);
        stu.setPassword("1313");
        stu.setName("Hoo");
        stu.setAge(24);
        stu.setGender("Man");
        stu.setFlag(true);
        stu.setHobby(Arrays.asList("Reading", "Watching Movies", "Playing Games"));
        stu.setSelectHobby(Arrays.asList("Reading","Watching Movies"));
        Address address = new Address();
        address.setId(1);
        address.setName("Happiness Road");
        stu.setAddress(address);
        model.addAttribute("student",stu);
        return "student2";
    }

    @PostMapping("/update")
    public String update(Student stu){
        System.out.println(stu);
        return "student2";
    }
    
}
```

3，Common Forms

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false"%>
<html>
<head>
    <title>Title</title>
</head>
<body>

<h1>Student Information</h1>
<form action="" method="post">
  serial number：<input type="text" name="id" value="${student.id}" readonly/><br/>
  name：<input type="text" name="name" value="${student.name}"/><br/>
  age：<input type="text" name="age" value="${student.age}"/><br/>
  gender：<input type="text" name="gender" value="${student.gender}"/><br/>
  <input type="submit" value="Submit"/>
</form>

</body>
</html>
```

Use New Form

```jsp
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
```

```jsp
<form:form modelAttribute="student" action="/student/update" method="post">
  id：<form:input path="id"/><br/>
  name：<form:input path="name"/><br/>
  password：<form:password path="password"/><br/>
  age：<form:input path="age"/><br/>
  gender：<form:input path="gender"/><br/>
  address：<form:input path="address.name"/><br/>

  checkbox：<form:checkbox path="flag" value="1"/><br/>

<%--  <form:checkbox path="hobby" value="Reading"/>Reading<br/>--%>
<%--  <form:checkbox path="hobby" value="Watching Movies"/>Watching Movies<br/>--%>
<%--  <form:checkbox path="hobby" value="Playing Games"/>Playing Games<br/>--%>

  <form:checkboxes path="selectHobby" items="${student.hobby}"/><br/>

  <input type="submit" value="Submit"/>
</form:form>
```

Password tag

Data will not be displayed

```jsp
<form:password path="password"/>
```

Checkbox Tag

```jsp
<form:checkbox path="hobby" value="Reading"/>
```



### Spring MVC Internationalization

Internationalization is to display different languages

1. Configure spring.xml

```xml
<!-- Internationalization -->
    <bean id="messageSource" class="org.springframework.context.support.ReloadableResourceBundleMessageSource">
        <property name="basename" value="classpath:language"/>
        <property name="useCodeAsDefaultMessage" value="true"/>
    </bean>

    <!-- Internationalization Interceptor -->
    <mvc:interceptors>
        <bean id="localeChangeInterceptor" class="org.springframework.web.servlet.i18n.LocaleChangeInterceptor">
            <property name="paramName" value="lang"/>
        </bean>
    </mvc:interceptors>

    <!-- Internationalization Configuration -->
    <bean id="localeResolver" class="org.springframework.web.servlet.i18n.SessionLocaleResolver"/>
```

2，Create a file 

resources -> language_en_US.properties

```properties
language.cn = \u4E2D\u6587
language.en = English
info = login
username = username
password = password
repassword = repassword
tel = tel
email = email
submit = submit
reset = reset
```

resources -> language_zh_CN.properties

```properties
language.cn = \u4E2D\u6587
language.en = English
info = \u767B\u9646
username = \u7528\u6237\u540D
password = \u5BC6\u7801
repassword = \u786E\u8BA4\u5BC6\u7801
tel = \u7535\u8BDD
email = \u7535\u5B50\u90AE\u7BB1
submit = \u63D0\u4EA4
reset = \u91CD\u7F6E
```

3，Handler

```java
package com.xs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/inter")
public class InterHandler {

    @GetMapping("/index")
    public String index(){
        return "inter";
    }
    
}
```

4，intel.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<html>
<head>
    <title>Title</title>
</head>
<body>

<a href="index?lang=en_US">English</a>
<a href="index?lang=zh_CN">Chinese</a>

<spring:message code="info"/>
<form>
    <spring:message code="username"/>:<input type="text"/><br/>
    <spring:message code="password"/>:<input type="password"/><br/>
    <spring:message code="repassword"/>:<input type="password"/><br/>
    <spring:message code="tel"/>:<input type="text"/><br/>
    <spring:message code="email"/>:<input type="text"/><br/>
    <input type="submit" value="<spring:message code="submit"/>"/>
    <input type="reset" value="<spring:message code="reset"/>"/>
</form>

</body>
</html>
```

Implement language switching

http://localhost:8080/inter/index?lang=en_US

http://localhost:8080/inter/index?lang=zh_CN





## Spring MVC Full range of functions

```
@ResponseBody
@RequestMapping(value = "/index", method = RequestMethod.POST, params = "id")
@Controller
@RequestBody
@ModelAttribute
@ResponseBody
@RequestBody
@GetMapping("/find")
@Repository
@Data
@AllArgsConstructor
@NoArgsConstructor
@Autowired
@RestController
@RequestParam
@RequestParam(value="id", required = true, defaultValue = "0") int id
@PathVariable
@Valid
@Validated

HttpServletRequest
ModelAndView
Map
Model
HttpSession
HttpServletResponse
MultipartFile
BindingResult

${pageContext.request.contextPath}

<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
```

**`@RequestBody`**：Tells Spring MVC to read the data from the request body and automatically convert the JSON into a `User` object.

```javascript
$(function(){
        var user = {
            "id" : 1,
            "name" : "Hoo"
        }

        $.ajax({
            type: "POST",
            url: "hello/jsonType",
            dataType: "JSON",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(user),
            success: function (data) {
                alert(data.id);
                alert(data.name);
            }
        })
    })
```

```java
@RequestMapping(value = "/jsonType", method = RequestMethod.POST)
    @ResponseBody
    public User jsonType(@RequestBody User user) {
        System.out.println(user);
        return user;
    }
```

**`@Repository`** Typically used to mark classes responsible for interacting with the database, such as classes that implement CRUD (create, read, update, delete) operations.

**`@PathVariable`** It is an annotation in Spring MVC that is used to extract variable values ​​from the request URL path and map them to method parameters. In other words, it allows you to get a dynamic part (path variable) from the URL and use the value in the controller method.

`http://localhost:8080/courses/1`In the example, `1` can be obtained using `@PathVariable`.

```java
@RestController
public class UserController {
    @GetMapping("/user/{id}")
    public String getUserById(@PathVariable("id") Integer id) {
        return "User ID: " + id;
    }
}
```

```java
@GetMapping("/courses/{id}")
public String getCourseById(@PathVariable("id") Integer courseId) {
    // Get a course by ID
    return "courseDetails";
}
```

**`**@RestController`**** The data returned by the method is directly used as the body content of the HTTP response instead of returning a view.

**Automatic serialization**: The returned object is automatically converted to JSON or XML format (depending on the content type requested by the client).

**Typical application scenarios**: Mainly used to create RESTful APIs, especially when you need to return JSON or XML data.

```java
@RestController
public class UserController {

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable Integer id) {
        // Returns a User object in JSON format
        return new User(id, "John");
    }
}
```

**When to use**: When your application is deployed in a non-root path (not `/`), such as `/myApp`, you need to use `pageContext.request.contextPath` to ensure that the generated link path is correct. If you don't add this, the path may not find the resource, resulting in a 404 error.

**What is pageContext.request.contextPath**: It is an expression in JSP that is used to get the **context path** (`contextPath`) of your application, that is, the deployment path of the application on the server. For example, if your application is deployed in `/myApp`, `pageContext.request.contextPath` will return `/myApp`.

```jsp
// http://localhost:8080/springMVC_03     /course/deleteById/${course.id}
<form action="${pageContext.request.contextPath}/course/deleteById/${course.id}" method="post">
          <input type="hidden" name="_method" value="DELETE" />
          <input type="submit" value="DELETE"/>
</form>
```

 **@RequestParam**

The `sort` parameter in `http://localhost:8080/courses?sort=asc` can be obtained using `@RequestParam`.

```java
@GetMapping("/courses")
public String getCourses(@RequestParam("sort") String sortOrder) {
    // Handling sorting logic
    return "courses";
}
```

**`MultipartFile`** It is the core interface for processing file uploads, providing various methods and functions for uploading files.



#### Package Project

```
mvn clean package
```



#### RESTful API

```java
@Controller
@RequestMapping("/rest")
public class RESTHandler {

    private Map<Integer, Course> courseMap;

    // Test use can be deleted
    public CourseRepository(){
        courseMap = new HashMap<>();
        courseMap.put(1,new Course(1,"Java基础",Double.parseDouble("500")));
        courseMap.put(2,new Course(2,"Java高级",Double.parseDouble("700")));
        courseMap.put(3,new Course(3,"企业家",Double.parseDouble("800")));

    }

    public Collection<Course> findAll(){
        return courseMap.values();
    }

    public Course findById(Integer id){
        return courseMap.get(id);
    }

    public void saveOrUpdate(Course course){
        courseMap.put(course.getId(),course);
    }

    public void deleteById(Integer id){
        courseMap.remove(id);
    }

}
```

#### Return to view

```java
// Return to view
return "redirect:/index.jsp";
```

#### Java Spring MVC LINQ grammar

1. Normal output

This is C# LINQ syntax

```c#
var Admin = (from c in Admin_list
			select new PostData
			{
			  Title = c.title,
			  Username = "",
			  Date_post = DateTime.Parse(c.date_post.ToString()).ToString("yyyy-M-d hh:mm tt", new System.Globalization.CultureInfo("en-US")),
			  Role = c.role,
			  Img = c.imglist == "Null" ? false : true,
			  Imgurl = c.imglist,
			  UserId = 0,
			  PostId = c.Id,
			  View = c.View,
			  Comment = c.Comment,
			  PostType = c.type_post.Remove(c.type_post.Length - 1),
			  Color = c.Color,
			  typedata = "none",
			}).ToList();
```

This is Spring MVC

```java
public List<PostData> getAdminData(List<AdminEntity> adminList) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-M-d hh:mm a", Locale.US);

        return adminList.stream()
                .map(c -> new PostData(
                        c.getTitle(),
                        "", // Username is empty
                        LocalDateTime.parse(c.getDatePost().toString()).format(formatter), // Parse date and format
                        c.getRole(),
                        !"Null".equals(c.getImglist()), // Img condition
                        c.getImglist(),
                        0, // UserId is 0
                        c.getId(),
                        c.getView(),
                        c.getComment(),
                        c.getTypePost().substring(0, c.getTypePost().length() - 1), // Remove last character
                        c.getColor(),
                        "none" // typedata is "none"
                ))
                .collect(Collectors.toList());
    }
```

2. Where search

This is C# syntax

   ```c#
   ar Admin_Data = (from c in User_list
   							  where c.userid == 1
   							  select new PostData
   							  {
   								  Title = c.title,
   								  Username = "",
   								  Date_post = DateTime.Parse(c.date_post.ToString()).ToString("yyyy-M-d hh:mm tt", new System.Globalization.CultureInfo("en-US")),
   								  Role = c.role,
   								  Img = c.imglist == "Null" ? false : true,
   								  Imgurl = c.imglist,
   								  UserId = 0,
   								  PostId = c.Id,
   								  View = c.View,
   								  Comment = c.Comment,
   								  PostType = c.type_post.Remove(c.type_post.Length - 1),
   								  Color = c.Color,
   								  typedata = "none",
   							  }).ToList();
   
   ```

  This is the Spring MVC syntax

   ```java
   public List<PostData> getAdminData(List<UserEntity> userList) {
           DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-M-d hh:mm a", Locale.US);
   
           // Filter out data with userid == 1 and convert it to PostData
           List<PostData> adminData = userList.stream()
                   .filter(c -> c.getUserid() == 1) // LINQ equivalent where c.userid == 1
                   .map(c -> new PostData(
                           c.getTitle(),
                           "", // Username is empty
                           LocalDateTime.parse(c.getDatePost().toString()).format(formatter), // Parsing and formatting dates
                           c.getRole(),
                           !"Null".equals(c.getImglist()), // Ternary Operator
                           c.getImglist(),
                           0, // UserId is 0
                           c.getId(),
                           c.getView(),
                           c.getComment(),
                           c.getTypePost().substring(0, c.getTypePost().length() - 1), // Remove the last character
                           c.getColor(),
                           "none" // typedata is "none"
                   ))
                   .collect(Collectors.toList());
   
           return adminData;
       }
   ```

3. Join link

C# syntax

```c#
var db = (from c in User_list
					  join us in user_list on c.userid equals us.Id
					  select new PostData
					  {
						  Title = c.title,
						  Username = us.username,
						  Date_post = DateTime.Parse(c.date_post.ToString()).ToString("yyyy-M-d hh:mm tt", new System.Globalization.CultureInfo("en-US")),
						  Role = c.role,
						  Img = c.imglist == "Null" ? false : true,
						  Imgurl = c.imglist,
						  UserId = us.Id,
						  PostId = c.Id,
						  View = c.View,
						  Comment = c.Comment,
						  PostType = c.type_post.Remove(c.type_post.Length - 1),
						  Color = c.Color,
						  typedata = "none",
					  }).OrderByDescending(x => x.PostId).ToList();
```

Spring MVC grammar

```java
public List<PostData> getJoinedAdminData(List<UserEntity> userList, List<UserEntity> otherUserList) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-M-d hh:mm a", Locale.US);

        // Connect the data of User_list and user_list, and match by userid
        List<PostData> joinedData = userList.stream()
                .flatMap(c -> otherUserList.stream()
                        .filter(us -> c.getUserid() == us.getId()) // Equivalent to LINQ's join condition
                        .map(us -> new PostData(
                                c.getTitle(),
                                us.getUsername(), // Get the username from the connection result
                                LocalDateTime.parse(c.getDatePost().toString()).format(formatter), // Parsing and formatting dates
                                c.getRole(),
                                !"Null".equals(c.getImglist()), // Ternary Operator
                                c.getImglist(),
                                us.getId(), // UserId after association
                                c.getId(), // PostId
                                c.getView(),
                                c.getComment(),
                                c.getTypePost().substring(0, c.getTypePost().length() - 1), // Remove the last character
                                c.getColor(),
                                "none" // typedata is "none"
                        ))
                )
                .sorted((x, y) -> Integer.compare(y.getPostId(), x.getPostId())) // Sort by PostId in descending order
                .collect(Collectors.toList());

        return joinedData;
    }
```

4. Full syntax (where, select and join logic)

   ```java
    // Public Methods, including where, select and join logic
       public List<PostData> getPostData(List<UserEntity> userList, List<UserEntity> otherUserList, int filterUserId) {
           
           // Directly perform where, select, join and sort operations
           List<PostData> postDataList = userList.stream()
                   .filter(c -> c.getUserid() == filterUserId || filterUserId == 0) // where condition, no filtering when 0
                   .flatMap(c -> otherUserList.stream()
                           .filter(us -> c.getUserid() == us.getId()) // join condition
                           .map(us -> new PostData(
                                   c.getTitle(),
                                   us.getUsername(), // Username obtained from otherUserList
                                   LocalDateTime.parse(c.getDatePost().toString()).format(formatter), // Date formatting
                                   c.getRole(),
                                   !"Null".equals(c.getImglist()), // Determine whether imglist is "Null"
                                   c.getImglist(),
                                   us.getId(), // UserId after association
                                   c.getId(), // PostId
                                   c.getView(),
                                   c.getComment(),
                                   c.getTypePost().substring(0, c.getTypePost().length() - 1), // Remove the last character
                                   c.getColor(),
                                   "none" // typedata defaults to "none"
                           ))
                   )
                   .sorted((x, y) -> Integer.compare(y.getPostId(), x.getPostId())) // Sort by PostId in descending order
                   .collect(Collectors.toList());
   
           return postDataList;
       }
   ```

   5.Return Json format

```java
		  // Example method, similar to the way to return JSON in C#
          @GetMapping("/getJsonData")
          @ResponseBody
          public List<Map<String, Object>> getJsonData() {
              // Simulated data: keyValuePairs and userdata lists
              List<Map.Entry<String, Integer>> keyValuePairs = List.of(
                      Map.entry("1", 101),
                      Map.entry("2", 102)
              );
      
              List<UserEntity> userdata = List.of(
                      new UserEntity(101, "avatar1.png", "John", "0", "123 Street", 5),
                      new UserEntity(102, "avatar2.png", "Jane", "1", "456 Avenue", 10)
              );
      
              // Join operation: connect based on the value of keyValuePairs and the Id of userdata
              List<Map<String, Object>> json = keyValuePairs.stream()
                      .flatMap(c -> userdata.stream()
                              .filter(user -> c.getValue().equals(user.getId())) // join condition
                              .map(user -> Map.of(
                                      "id", c.getKey(),
                                      "avatar", user.getAvatar(),
                                      "name", user.getUsername(),
                                      "gender", "0".equals(user.getGender()) ? "Male" : "Female",
                                      "address", user.getAddress(),
                                      "lv", "LV." + user.getLevel()
                              ))
                      )
                      .collect(Collectors.toList());
      
              // Return JSON response
              return json;
          }
```