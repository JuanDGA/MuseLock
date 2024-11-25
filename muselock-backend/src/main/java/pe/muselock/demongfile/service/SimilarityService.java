package pe.muselock.demongfile.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.*;
import java.net.*;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class SimilarityService {
  @Value("${similarity.url}")
  private String microserviceUrl;

  private final RestTemplate template = new RestTemplate();

  private String microserviceCall(String action, Map<String, Object> data) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<Map<String, Object>> request = new HttpEntity<>(data, headers);

    String res = template.postForObject(microserviceUrl + "/" + action, request, String.class);

    return res.substring(1, res.length() - 1);
  }

  public double checkSimilarity(byte[] imageBytes) {
    String action = "most_similar";
    String base64Image = Base64.getEncoder().encodeToString(imageBytes);

    Map<String, Object> body = new HashMap<>();
    body.put("image_data", base64Image);

    String response = this.microserviceCall(action, body);

    if (response.isBlank()) return 0.0;

    String[] images = response.split(",");
    String[][] imagesWithScore = new String[images.length][2];

    for (int i = 0; i < images.length; i++) {
      imagesWithScore[i] = images[i].split(";");
    }

    return Double.parseDouble(imagesWithScore[0][1]);
  }

  public void save(byte[] bytes, Long id) {
    String action = "save";
    String base64Image = Base64.getEncoder().encodeToString(bytes);

    Map<String, Object> body = new HashMap<>();
    body.put("image_data", base64Image);
    body.put("id", id.toString());

    this.microserviceCall(action, body);
  }
}