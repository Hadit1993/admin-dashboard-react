import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { useGetProductsQuery } from "../../redux/global/globalApi";
import { FC, useState } from "react";
import ProductWithStats from "../../infrastructure/dtos/ProductWithStats";

const ProductsPage = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products" />
      {isLoading ? (
        <>...Loading</>
      ) : data ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": {
              gridColumn: isNonMobile ? undefined : "span 4",
            },
          }}
        >
          {data.map((prod) => (
            <SingleProduct {...prod} theme={theme} key={prod.product.id} />
          ))}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

type SingleProductProps = ProductWithStats & { theme: Theme };

const SingleProduct: FC<SingleProductProps> = ({
  product,
  productStat,
  theme,
}) => {
  const [isExpanded, setExpanded] = useState(false);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {product.category}
        </Typography>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(product.price).toFixed(2)}
        </Typography>
        <Rating value={product.rating} readOnly />
        <Typography variant="body2">{product.description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setExpanded(!isExpanded)}
        >
          See more
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {product.id}</Typography>
          <Typography>Sypply Left: {product.supply}</Typography>
          <Typography>
            Yearly Sales This Year: {productStat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {productStat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ProductsPage;
