module.exports = {
  async rewrites() {
    return [
      {
        source: "/serverapi/:path",
        destination: "http://173.231.222.233:5000/api/:path",
      },
    ];
  },
};
