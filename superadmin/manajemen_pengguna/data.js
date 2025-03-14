const users = Array.from({ length: 50 }, (_, i) => ({
  nip: `100${i + 1}`,
  name: `Nama Pegawai ${i + 1}`,
  position: `Posisi ${(i % 5) + 1}`,
  division: `Divisi ${(i % 3) + 1}`,
  unit: `Unit ${(i % 4) + 1}`,
  location: `Lokasi ${(i % 3) + 1}`,
  email: `pegawai${i + 1}@company.com`,
  username: `user${i + 1}`,
  password: `password${i + 1}`,
  role: ["Super Admin", "Admin", "User"][i % 3],
}));

export { users };
