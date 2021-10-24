FROM nginx:latest

# COPY ./kubernetes/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build /var/www

WORKDIR /var/www/

# CMD ["/usr/sbin/nginx", "-g", "daemon off;"]
