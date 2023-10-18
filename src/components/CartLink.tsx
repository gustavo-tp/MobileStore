import { Link } from "expo-router";

export default function CartLink() {
  return (
    <Link href="/cart" style={{ color: "#fff" }}>
      Carrinho
    </Link>
  );
}
