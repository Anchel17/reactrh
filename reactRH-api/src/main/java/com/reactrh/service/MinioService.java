package com.reactrh.service;

import java.io.ByteArrayInputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import io.minio.BucketExistsArgs;
import io.minio.GetObjectArgs;
import io.minio.MakeBucketArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MinioService {
    @Autowired
    private MinioClient minioClient;
    
    @Value("${minio.bucketName}")
    private String bucketName;
    
    public void createBucketIfNotExists() {
        try {
            var existeBucket = minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
            
            if(Boolean.FALSE.equals(existeBucket)) {
                minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
                log.info("[CRIAR_BUCKET][SUCESSO] - Bucket {} criado com sucesso!", bucketName);
            }
        }
        catch(Exception e){
            log.error("[CRIAR_BUCKET][ERROR] - Erro ao criar bucket: " + e.getMessage());
        }
    }
    
    public void uploadFile(MultipartFile arquivoImagem, String caminhoBucket) {
        try {
            createBucketIfNotExists();
            var inputStream = new ByteArrayInputStream(arquivoImagem.getBytes());
            
            minioClient.putObject(PutObjectArgs.builder()
                    .bucket(bucketName)
                    .object(caminhoBucket)
                    .stream(inputStream, -1, 10485760)
                    .build()
                    );
            
            log.info("[ENVIAR_ARQUIVO][SUCESSO]");
        }
        catch(Exception e) {
            log.error("[ENVIAR_ARQUIVO][ERROR] - Erro ao enviar arquivo para o bucket: ", e.getMessage(), e);
        }
    }
    
    public byte[] buscarImagemFuncionario(String caminhoBucket) {
        try {
            var inputStream = minioClient.getObject(
                    GetObjectArgs.builder()
                    .bucket(bucketName)
                    .object(caminhoBucket)
                    .build()
                    );
            
            return inputStream.readAllBytes();
        }
        catch(Exception e) {
            log.error("[BUSCAR_ARQUIVO][ERROR] - Erro ao buscar arquivo no bucket", e.getMessage());
            return new byte[0];
        }
    }
}
