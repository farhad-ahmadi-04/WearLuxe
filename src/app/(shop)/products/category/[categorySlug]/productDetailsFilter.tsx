"use client";

import Container from "@/components/container";
import { dataColorFilter, dataSizeFilter } from "@/config/productDatailsFilter";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  FormGroup,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ProductDetailsFilter({
  showDrawerFilter,
}: {
  showDrawerFilter: boolean;
}) {
  const isMouseDownRef = useRef(false);
  const maxPrice = 2000000;

  const searchParams = useSearchParams();
  const getInitialValue = () => {
    const priceGte = searchParams.get("price_gte");
    const priceLte = searchParams.get("price_lte");
    if (priceGte !== null && priceLte !== null) {
      const gte = maxPrice - Number(priceLte);
      const lte = maxPrice - Number(priceGte);
      if (!isNaN(lte) && !isNaN(gte)) {
        return [gte, lte];
      }
    }
    return [0, maxPrice];
  };
  const [value, setValue] = useState<number[]>(getInitialValue());
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const [didMount, setDidMount] = useState(false);
  const [handleFilterChange, setHandleFilterChange] = useState<string | null>(
    null
  );
  const [validationCheck, setValidationCheck] = useState(false);
  const [slugValid, setSlugValid] = useState(false);

  const { sizeNumber, sizes } = dataSizeFilter;

  useEffect(() => {
    setSlugValid(pathname.charAt(pathname.length - 1) == "1" ? true : false);
  }, [pathname]);

  useEffect(() => {
    const url = searchParams.toString().split("&");
    const newFilter: string = handleFilterChange?.replace("&", "") || "";

    if (validationCheck) {
      url.push(newFilter);
    } else {
      const index = url.indexOf(newFilter);
      if (index !== -1) {
        url.splice(index, 1);
      }
    }
    const newUrl = url.join("&");
    router.push(`${pathname}?${newUrl}`);
  }, [handleFilterChange, validationCheck, pathname, router, searchParams]);

  const handleChange = (_: Event, newValue: number[]) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!didMount) {
      setDidMount(true);
      return;
    }
    const currentUrl = new URLSearchParams(searchParams.toString());
    currentUrl.set("price_lte", (maxPrice - value[0]).toString());
    currentUrl.set("price_gte", (maxPrice - value[1]).toString());

    router.push(`${pathname}?${currentUrl.toString()}`);
  }, [value, pathname]);

  useEffect(() => {
    setOpenFilterDrawer(showDrawerFilter);
  }, [showDrawerFilter]);

  const toggleDrawerFilter = (open: boolean) => setOpenFilterDrawer(open);

  const handleMouseDown = () => {
    isMouseDownRef.current = true;
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ display: { xs: "flex", xl: "none" } }}>
        <Button
          variant="outlined"
          onClick={() => setOpenFilterDrawer(!openFilterDrawer)}
        >
          جستجوی پیشرفته
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: { xs: "none", xl: "flex" },
          flexDirection: "column",
          py: 2,
        }}
      >
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
            <Typography variant="overline" sx={{ fontSize: "16px !important" }}>
              قیمت
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
              <Box>
                <Typography>از</Typography>
                <TextField
                  variant="outlined"
                  dir="ltr"
                  value={(maxPrice - value[1]).toLocaleString()}
                />
              </Box>
              <Box>
                <Typography>تا</Typography>
                <TextField
                  variant="outlined"
                  dir="ltr"
                  value={(maxPrice - value[0]).toLocaleString()}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="overline"
                sx={{ fontSize: "12px !important" }}
              >
                حداقل
              </Typography>
              <Slider
                sx={{ width: "66.666667%", color: "primary.main" }}
                value={value}
                onChange={handleChange}
                onMouseDown={handleMouseDown}
                step={50000}
                min={0}
                max={maxPrice}
              />
              <Typography
                variant="overline"
                sx={{ fontSize: "12px !important" }}
              >
                حداکثر
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        {Object.entries(dataColorFilter).map(([key, { title, filters }]) => (
          <Accordion key={key} sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
              <Typography
                variant="overline"
                sx={{ fontSize: "16px !important" }}
              >
                {title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {filters.map(({ id, name }) => {
                const isChecked =
                  searchParams.get("color") ===
                  id.replace("&", "").split("=")[1];

                return (
                  <FormGroup key={id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked}
                          onChange={(e) => setValidationCheck(e.target.checked)}
                        />
                      }
                      label={name}
                      sx={{
                        display: "flex",
                        flexDirection: "row-reverse",
                        justifyContent: "space-between",
                      }}
                      onClick={() => {
                        setHandleFilterChange(id);
                      }}
                    />
                  </FormGroup>
                );
              })}
            </AccordionDetails>
          </Accordion>
        ))}

        <Accordion sx={{ mt: 2 }}>
          <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
            <Typography variant="overline" sx={{ fontSize: "16px !important" }}>
              {sizeNumber.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {slugValid
              ? Array.isArray(sizeNumber.filters) &&
                sizeNumber.filters.map(({ id, name }) => {
                  const isChecked =
                    searchParams.get("size") ===
                    id.replace("&", "").split("=")[1];
                  return (
                    <FormGroup key={id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isChecked}
                            onChange={(e) =>
                              setValidationCheck(e.target.checked)
                            }
                          />
                        }
                        label={name}
                        sx={{
                          display: "flex",
                          flexDirection: "row-reverse",
                          justifyContent: "space-between",
                        }}
                        onClick={() => {
                          setHandleFilterChange(id);
                        }}
                      />
                    </FormGroup>
                  );
                })
              : Array.isArray(sizes.filters) &&
                sizes.filters.map(({ id, name }) => {
                  const isChecked =
                    searchParams.get("size") ===
                    id.replace("&", "").split("=")[1];
                  return (
                    <FormGroup key={id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isChecked}
                            onChange={(e) =>
                              setValidationCheck(e.target.checked)
                            }
                          />
                        }
                        label={name}
                        sx={{
                          display: "flex",
                          flexDirection: "row-reverse",
                          justifyContent: "space-between",
                        }}
                        onClick={() => {
                          setHandleFilterChange(id);
                        }}
                      />
                    </FormGroup>
                  );
                })}
          </AccordionDetails>
        </Accordion>
      </Box>

      <Drawer
        role="presentation"
        anchor="right"
        open={openFilterDrawer}
        onClose={() => toggleDrawerFilter(false)}
        classes={{ paper: "!w-[90%]" }}
        PaperProps={{ sx: { width: "90%" } }}
      >
        <Container sx={{ py: 4 }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            <Button variant="text" onClick={() => setOpenFilterDrawer(false)}>
              {<CloseIcon sx={{ color: "#262626" }} />}
            </Button>
          </Box>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
              <Typography
                variant="overline"
                sx={{ fontSize: "16px !important" }}
              >
                قیمت
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: "flex", gap: 4, mb: 4 }}>
                <Box>
                  <Typography>از</Typography>
                  <TextField
                    variant="outlined"
                    dir="ltr"
                    value={(maxPrice - value[1]).toLocaleString()}
                  />
                </Box>
                <Box>
                  <Typography>تا</Typography>
                  <TextField
                    variant="outlined"
                    dir="ltr"
                    value={(maxPrice - value[0]).toLocaleString()}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ fontSize: "12px !important", pl: 4 }}
                >
                  حداقل
                </Typography>
                <Slider
                  sx={{ width: "100%", color: "var(--color-primary-500)" }}
                  value={value}
                  onChange={handleChange}
                  step={50000}
                  min={0}
                  max={maxPrice}
                />
                <Typography
                  variant="overline"
                  sx={{ fontSize: "12px !important", pr: 4 }}
                >
                  حداکثر
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>

          {Object.entries(dataColorFilter).map(([key, { title, filters }]) => (
            <Accordion key={key} sx={{ mt: 2 }}>
              <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
                <Typography
                  variant="overline"
                  sx={{ fontSize: "16px !important" }}
                >
                  {title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {filters.map(({ id, name }) => {
                  const isChecked =
                    searchParams.get("color") ===
                    id.replace("&", "").split("=")[1];

                  return (
                    <FormGroup key={id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isChecked}
                            onChange={(e) =>
                              setValidationCheck(e.target.checked)
                            }
                          />
                        }
                        label={name}
                        sx={{
                          display: "flex",
                          flexDirection: "row-reverse",
                          justifyContent: "space-between",
                        }}
                        onClick={() => {
                          setHandleFilterChange(id);
                        }}
                      />
                    </FormGroup>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          ))}

          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<KeyboardArrowDownIcon />}>
              <Typography
                variant="overline"
                sx={{ fontSize: "16px !important" }}
              >
                {sizeNumber.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {slugValid
                ? sizeNumber.filters.map(({ id, name }) => {
                    const isChecked =
                      searchParams.get("size") ===
                      id.replace("&", "").split("=")[1];
                    return (
                      <FormGroup key={id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isChecked}
                              onChange={(e) =>
                                setValidationCheck(e.target.checked)
                              }
                            />
                          }
                          label={name}
                          sx={{
                            display: "flex",
                            flexDirection: "row-reverse",
                            justifyContent: "space-between",
                          }}
                          onClick={() => {
                            setHandleFilterChange(id);
                          }}
                        />
                      </FormGroup>
                    );
                  })
                : sizes.filters.map(({ id, name }) => {
                    const isChecked =
                      searchParams.get("size") ===
                      id.replace("&", "").split("=")[1];
                    return (
                      <FormGroup key={id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isChecked}
                              onChange={(e) =>
                                setValidationCheck(e.target.checked)
                              }
                            />
                          }
                          label={name}
                          sx={{
                            display: "flex",
                            flexDirection: "row-reverse",
                            justifyContent: "space-between",
                          }}
                          onClick={() => {
                            setHandleFilterChange(id);
                          }}
                        />
                      </FormGroup>
                    );
                  })}
            </AccordionDetails>
          </Accordion>
        </Container>
      </Drawer>
    </Box>
  );
}
