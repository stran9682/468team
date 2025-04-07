FROM ubuntu:latest

# RUN apt update -qq && apt install -y python3 python3-pip python3.12-venv wget

# RUN dpkg -i google-chrome-stable_current_amd64.deb
# RUN apt-get install -f

# COPY requirements.txt .

# RUN python3 -m venv my-venv
# RUN . my-venv/bin/activate
# ENV PATH="/my-venv/bin:$PATH"

# RUN my-venv/bin/pip install -r requirements.txt

# COPY WebScraper.py .
# CMD ["python3", "WebScraper.py"]

COPY script.sh .
RUN chmod -R 755 /script.sh
ENV PATH="/my-venv/bin:$PATH"

COPY requirements.txt .
RUN my-venv/bin/pip install -r requirements.txt

COPY WebScraper.py .
CMD ["python3", "WebScraper.py"]