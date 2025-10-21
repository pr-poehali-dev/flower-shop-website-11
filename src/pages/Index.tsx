import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  occasion: string;
};

type CartItem = Product & { quantity: number };

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(1250);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOccasion, setSelectedOccasion] = useState('all');

  const products: Product[] = [
    { id: 1, name: 'Нежный микс', price: 3200, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/7c3a6170-9aea-4393-82b1-512fafaa6684.jpg', category: 'bouquets', occasion: 'birthday' },
    { id: 2, name: 'Романтика', price: 4500, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/5076300d-9972-4827-bed3-c5cc2eb0f469.jpg', category: 'roses', occasion: 'love' },
    { id: 3, name: 'Весенняя радость', price: 2800, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/104e74d9-19b1-493c-8f6b-f6239b4c9d03.jpg', category: 'tulips', occasion: 'march8' },
    { id: 4, name: 'Букет счастья', price: 3800, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/7c3a6170-9aea-4393-82b1-512fafaa6684.jpg', category: 'bouquets', occasion: 'birthday' },
    { id: 5, name: 'Пионовый рай', price: 5200, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/5076300d-9972-4827-bed3-c5cc2eb0f469.jpg', category: 'peonies', occasion: 'wedding' },
    { id: 6, name: 'Тюльпаны микс', price: 2400, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/104e74d9-19b1-493c-8f6b-f6239b4c9d03.jpg', category: 'tulips', occasion: 'march8' },
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const occasionMatch = selectedOccasion === 'all' || product.occasion === selectedOccasion;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && occasionMatch && priceMatch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const loyaltyLevel = loyaltyPoints >= 5000 ? 'Золотой' : loyaltyPoints >= 2500 ? 'Серебряный' : 'Бронзовый';
  const nextLevelPoints = loyaltyPoints >= 5000 ? 0 : loyaltyPoints >= 2500 ? 5000 - loyaltyPoints : 2500 - loyaltyPoints;
  const progressToNextLevel = loyaltyPoints >= 5000 ? 100 : loyaltyPoints >= 2500 ? ((loyaltyPoints - 2500) / 2500) * 100 : (loyaltyPoints / 2500) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Icon name="Flower2" size={28} className="text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Тsyetochnitsa</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">Главная</a>
            <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">Каталог</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О нас</a>
            <a href="#contacts" className="text-sm font-medium hover:text-primary transition-colors">Контакты</a>
          </nav>

          <div className="flex items-center gap-2">
            <Sheet open={showAccount} onOpenChange={setShowAccount}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Icon name="User" size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Личный кабинет</SheetTitle>
                </SheetHeader>
                <Tabs defaultValue="loyalty" className="mt-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="loyalty">Лояльность</TabsTrigger>
                    <TabsTrigger value="profile">Профиль</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="loyalty" className="space-y-6">
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Ваш статус</span>
                          <Badge variant="secondary">{loyaltyLevel}</Badge>
                        </div>
                        <div className="text-3xl font-bold mb-1">{loyaltyPoints} баллов</div>
                        <p className="text-xs text-muted-foreground">1 балл = 1 рубль</p>
                      </div>

                      {nextLevelPoints > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>До следующего уровня</span>
                            <span className="font-medium">{nextLevelPoints} ₽</span>
                          </div>
                          <Progress value={progressToNextLevel} className="h-2" />
                        </div>
                      )}

                      <div className="grid grid-cols-3 gap-4 pt-4">
                        <div className="text-center p-4 bg-secondary/30 rounded-lg">
                          <Icon name="Gift" size={24} className="mx-auto mb-2 text-primary" />
                          <div className="text-xs font-medium">Бонусы за регистрацию</div>
                        </div>
                        <div className="text-center p-4 bg-secondary/30 rounded-lg">
                          <Icon name="Truck" size={24} className="mx-auto mb-2 text-primary" />
                          <div className="text-xs font-medium">Бесплатная доставка</div>
                        </div>
                        <div className="text-center p-4 bg-secondary/30 rounded-lg">
                          <Icon name="Sparkles" size={24} className="mx-auto mb-2 text-primary" />
                          <div className="text-xs font-medium">Свежие цветы</div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="profile" className="space-y-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя</Label>
                        <Input id="name" placeholder="Ваше имя" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Адрес доставки</Label>
                        <Input id="address" placeholder="Улица, дом, квартира" />
                      </div>
                      <Button className="w-full">Сохранить</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </SheetContent>
            </Sheet>

            <Sheet open={showCart} onOpenChange={setShowCart}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">Корзина пуста</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 pb-4 border-b">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Icon name="Minus" size={14} />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Icon name="Plus" size={14} />
                              </Button>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                      ))}
                      <div className="pt-4 space-y-4">
                        <div className="flex justify-between text-lg font-semibold">
                          <span>Итого:</span>
                          <span>{totalPrice} ₽</span>
                        </div>
                        {loyaltyPoints > 0 && (
                          <div className="text-sm text-muted-foreground">
                            Доступно {loyaltyPoints} бонусных баллов для оплаты
                          </div>
                        )}
                        <Button className="w-full" size="lg">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section id="home" className="relative py-20 overflow-hidden">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
              Свежие цветы с доставкой
            </h2>
            <p className="text-xl text-muted-foreground">
              Создаём радость в каждом букете. Бесплатная доставка и подарок к каждому заказу
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg px-8">
                <Icon name="Sparkles" size={20} className="mr-2" />
                Букет недели
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Перейти в каталог
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
            <Card className="text-center hover-scale">
              <CardContent className="pt-6 space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Flower" size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Свежие цветы</h3>
                <p className="text-sm text-muted-foreground">Ежедневные поставки от лучших производителей</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-scale">
              <CardContent className="pt-6 space-y-4">
                <div className="w-16 h-16 mx-auto bg-secondary/30 rounded-full flex items-center justify-center">
                  <Icon name="Truck" size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Быстрая доставка</h3>
                <p className="text-sm text-muted-foreground">Бесплатная доставка при заказе от 3000 ₽</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-scale">
              <CardContent className="pt-6 space-y-4">
                <div className="w-16 h-16 mx-auto bg-accent/50 rounded-full flex items-center justify-center">
                  <Icon name="Gift" size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Подарок в каждый заказ</h3>
                <p className="text-sm text-muted-foreground">Приятные сюрпризы для наших клиентов</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Каталог цветов</h2>

          <div className="mb-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Категория</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все категории" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    <SelectItem value="bouquets">Букеты</SelectItem>
                    <SelectItem value="roses">Розы</SelectItem>
                    <SelectItem value="tulips">Тюльпаны</SelectItem>
                    <SelectItem value="peonies">Пионы</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Повод</Label>
                <Select value={selectedOccasion} onValueChange={setSelectedOccasion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все поводы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все поводы</SelectItem>
                    <SelectItem value="birthday">День рождения</SelectItem>
                    <SelectItem value="wedding">Свадьба</SelectItem>
                    <SelectItem value="march8">8 марта</SelectItem>
                    <SelectItem value="love">Романтика</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Цена: {priceRange[0]} - {priceRange[1]} ₽</Label>
                <Slider
                  min={0}
                  max={10000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover-scale group">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary">{product.price} ₽</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full"
                    onClick={() => {
                      addToCart(product);
                      setShowCart(true);
                    }}
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-12 mt-16">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Flower2" size={24} className="text-primary" />
                <h3 className="font-bold text-lg">Тsyetochnitsa</h3>
              </div>
              <p className="text-sm text-muted-foreground">Живые цветы с душой и заботой</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Букеты</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Розы</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Тюльпаны</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Пионы</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Оплата</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (999) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@tsyetochnitsa.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Москва, ул. Цветочная, 15
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 Тsyetochnitsa. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
