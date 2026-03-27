FROM ollama/ollama:latest
RUN ollama serve > /dev/null 2>&1 & \
    sleep 10 && \
    ollama pull deepseek-r1:8b
EXPOSE 11434
CMD ["serve"]