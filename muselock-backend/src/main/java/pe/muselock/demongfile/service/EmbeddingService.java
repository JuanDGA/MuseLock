package pe.muselock.demongfile.service;

import org.springframework.stereotype.Service;

import java.io.*;
import java.net.Inet4Address;
import java.net.Socket;
import java.nio.ByteBuffer;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class EmbeddingService {
  public double[] embedding(byte[] imageBytes) throws IOException {
    try (
      Socket socket = new Socket(Inet4Address.getLocalHost().getHostName(), 23456);
      PrintWriter output = new PrintWriter(socket.getOutputStream(), true);
      BufferedReader input = new BufferedReader(new InputStreamReader(socket.getInputStream()))
    ) {
      output.println(Base64.getEncoder().encodeToString(imageBytes));

      String encodedEmbeddings = input.readLine();
      byte[] decodedEmbeddings = Base64.getDecoder().decode(encodedEmbeddings);

      double[] result = new double[decodedEmbeddings.length / 8];
      ByteBuffer.wrap(decodedEmbeddings).asDoubleBuffer().get(result);

      return result;
    }
  }

  public String test() {
    byte[] random = new byte[100];

    SecureRandom secureRandom = new SecureRandom();
    secureRandom.nextBytes(random);

    return new String(random);
  }
}
