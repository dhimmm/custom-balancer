# Step 1: Use an Nginx base image with build tools and dependencies
FROM nginx:1.21.6 as build

# Install necessary packages for building Nginx with GeoIP2 support
RUN apt-get update && apt-get install -y \
    wget \
    gcc \
    make \
    build-essential \
    libpcre3 \
    libpcre3-dev \
    zlib1g-dev \
    libssl-dev \
    git \
    libmaxminddb-dev \
    && rm -rf /var/lib/apt/lists/*

# Download and extract Nginx source code
WORKDIR /usr/src
RUN wget http://nginx.org/download/nginx-1.21.6.tar.gz && \
    tar -zxvf nginx-1.21.6.tar.gz && \
    rm nginx-1.21.6.tar.gz

# Clone the GeoIP2 module
RUN git clone https://github.com/leev/ngx_http_geoip2_module.git

# Build Nginx with the GeoIP2 module
WORKDIR /usr/src/nginx-1.21.6
RUN ./configure --with-compat --add-dynamic-module=../ngx_http_geoip2_module && \
    make modules

# Step 2: Create the final runtime image
FROM nginx:1.21.6

# Install the runtime dependencies for GeoIP2
RUN apt-get update && apt-get install -y libmaxminddb0 && rm -rf /var/lib/apt/lists/*

# Copy the compiled GeoIP2 module to the Nginx modules directory
COPY --from=build /usr/src/nginx-1.21.6/objs/ngx_http_geoip2_module.so /etc/nginx/modules/

# Copy the GeoIP2 database and Nginx configuration from the context
COPY ./GeoLite2-Country.mmdb /etc/nginx/
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Load the GeoIP2 module in the default Nginx configuration
RUN echo "load_module /etc/nginx/modules/ngx_http_geoip2_module.so;" > /etc/nginx/modules.conf

# Start Nginx with the specified configuration
CMD ["nginx", "-g", "daemon off;"]
