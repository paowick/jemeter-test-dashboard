### run
```
docker-compose up -build
```

### 1. Check Container Status
Make sure all containers are running properly:

```
docker ps
```
You should see these containers running:

- ```nginx```

- ```jmeter``` (may finish if it's non-looping)

- ```otel-collector```

- ```prometheus```

- ```grafana```

If any container crashes, use ```docker logs <container_name>``` to inspect it.

### 2. Verify API Server (Nginx)
Open your browser and go to:

```
http://localhost:8080/api/hello
```
You should see:

```
Hello from Nginx API
```
If that works, your API is live and ready to be tested by JMeter.

### 3. View Prometheus Metrics
Go to:

```
http://localhost:9090
```
- Click "Status > Targets" to check if ```otel-collector:8889``` is being scraped.
- You can try searching for metrics like:
  ```
  scrape_duration_seconds
  ```

### 4. Access Grafana Dashboard
Go to:

```
http://localhost:3000
```
- Login with default credentials:

  * Username: ```admin```

  * Password: ```admin```

- Add Prometheus as a data source:

  * Go to **Conecttions** > **Data Sources** 

  * Choose **Prometheus**

  * Set the URL to: ```http://prometheus:9090```

  * Click Save & Test

### 5. Create Grafana Dashboard
Now that Grafana is connected to Prometheus:

- Click **+** > **Dashboard** > **New dashboard** > **Add visualization** > **Prometheus**
- Use metrics like:
  * scrape_duration_seconds

### 6. Review JMeter Results
If the JMeter container ran and exited, check the results:

```
docker-compose logs jmeter
```
Or view the ```results.jtl``` file in the ```./jmeter/``` folder. You can open it in JMeter GUI to inspect:

- Average response time

- Success/failure rate

- Throughput

### 7. (Optional) Loop JMeter for Continuous Load
If you want continuous load testing:

Update the JMeter test plan (test-plan.jmx) to loop forever or for a long duration. Then restart JMeter like this:

```
docker-compose up jmeter
```

## 🛠 To Customize:
Change thread count: ```<stringProp name="ThreadGroup.num_threads">10</stringProp>```

Change duration: ```<stringProp name="LoopController.loops">60</stringProp>```

Change the target URL in ```API_URL``` variable if needed