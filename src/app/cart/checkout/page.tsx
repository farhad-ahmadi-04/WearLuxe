"use client";

import { Divider, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

const cities = [
  "تهران",
  "مشهد",
  "اصفهان",
  "شیراز",
  "تبریز",
  "کرج",
  "اهواز",
  "قم",
  "کرمانشاه",
  "ارومیه",
];

function Checkout() {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  console.log("cities =", cities, Array.isArray(cities));

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    street: "",
    homeCode: "",
    phoneNumber: "",
    email: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // const validateForm = () => {
  //     const newErrors: { [key: string]: string } = {}

  //     if (!formData.firstName.trim()) {
  //         newErrors.firstName = "نام الزامی است"
  //     }

  //     if (!formData.lastName.trim()) {
  //         newErrors.lastName = "نام خانوادگی الزامی است"
  //     }

  //     if (!formData.city.trim()) {
  //         newErrors.city = "شهر الزامی است"
  //     }

  //     if (!formData.address.trim()) {
  //         newErrors.address = "آدرس الزامی است"
  //     }

  //     if (!formData.street.trim()) {
  //         newErrors.street = "نام خیابان الزامی است"
  //     }

  //     if (!formData.phoneNumber.trim()) {
  //         newErrors.phoneNumber = "شماره تلفن الزامی است"
  //     } else if (!/^09\d{9}$/.test(formData.phoneNumber)) {
  //         newErrors.phoneNumber = "شماره تلفن معتبر نیست"
  //     }

  //     if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  //         newErrors.email = "ایمیل معتبر نیست"
  //     }

  //     setErrors(newErrors)
  //     return Object.keys(newErrors).length === 0
  // }

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        اطلاعات تحویل گیرنده
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2} size={{ xs: 12 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="نام *"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            error={!!errors.firstName}
            helperText={errors.firstName}
            variant="outlined"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="نام خانوادگی *"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            error={!!errors.lastName}
            helperText={errors.lastName}
            variant="outlined"
          />
        </Grid>

        {/* شهر */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            select
            label="شهر *"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            error={!!errors.city}
            helperText={errors.city}
            variant="outlined"
            slotProps={{
              select: {
                native: true,
              },
            }}
          >
            <option value="">انتخاب شهر</option>
            {Array.isArray(cities) &&
              cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </TextField>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="کد پستی"
            value={formData.homeCode}
            onChange={(e) => handleInputChange("homeCode", e.target.value)}
            error={!!errors.homeCode}
            helperText={errors.homeCode}
            variant="outlined"
            placeholder="۱۲۳۴۵۶۷۸۹۰"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="نام خیابان *"
            value={formData.street}
            onChange={(e) => handleInputChange("street", e.target.value)}
            error={!!errors.street}
            helperText={errors.street}
            variant="outlined"
            placeholder="مثال: خیابان ولیعصر"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="آدرس کامل *"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            error={!!errors.address}
            helperText={errors.address}
            variant="outlined"
            placeholder="آدرس کامل شامل پلاک، واحد و سایر جزئیات"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="شماره تلفن همراه *"
            value={formData.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            variant="outlined"
            placeholder="۰۹۱۲۳۴۵۶۷۸۹"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="ایمیل (اختیاری)"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            variant="outlined"
            placeholder="example@email.com"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Checkout;
