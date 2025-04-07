apt update
apt install -y wget
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
dpkg -i google-chrome-stable_current_amd64.deb
apt-get install -f -y
wget https://storage.googleapis.com/chrome-for-testing-public/134.0.6998.165/linux64/chromedriver-linux64.zip
apt install unzip -y
unzip chromedriver-linux64.zip
mv /chromedriver-linux64/chromedriver /bin
chown root:root /usr/bin/chromedriver
chmod +x /usr/bin/chromedriver
apt install -y python3 python3-pip python3.12-venv
python3 -m venv my-venv
. my-venv/bin/activate