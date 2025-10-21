import { useState, useEffect } from 'react';
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
  colors?: string[];
};

type CartItem = Product & { quantity: number };

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(1250);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOccasion, setSelectedOccasion] = useState('all');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const products: Product[] = [
    { id: 1, name: 'Якобиния Поли', price: 2800, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/7895b29e-bcaf-4df1-b9b6-cad04b525af0.jpg', category: 'flowering', occasion: 'home' },
    { id: 2, name: 'Брейния снежная', price: 3200, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/9c539c37-2a10-484b-9d88-7456b9351678.jpg', category: 'foliage', occasion: 'home' },
    { id: 3, name: 'Циссус Антарктический', price: 1800, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/6d243dc0-cbef-4c44-bf71-5e33f689bcbe.jpg', category: 'vines', occasion: 'office' },
    { id: 4, name: 'Циссус Ромболистный', price: 1900, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/6d243dc0-cbef-4c44-bf71-5e33f689bcbe.jpg', category: 'vines', occasion: 'office' },
    { id: 5, name: 'Циссус Разноцветный', price: 2100, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/6d243dc0-cbef-4c44-bf71-5e33f689bcbe.jpg', category: 'vines', occasion: 'home' },
    { id: 6, name: 'Циссус Круглолистный', price: 2000, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/6d243dc0-cbef-4c44-bf71-5e33f689bcbe.jpg', category: 'vines', occasion: 'office' },
    { id: 7, name: 'Циссус Четырехугольный', price: 2200, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/6d243dc0-cbef-4c44-bf71-5e33f689bcbe.jpg', category: 'vines', occasion: 'home' },
    { id: 8, name: 'Циссус Полосатый', price: 2300, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/6d243dc0-cbef-4c44-bf71-5e33f689bcbe.jpg', category: 'vines', occasion: 'office' },
    { id: 9, name: 'Циссус Амазонский', price: 2400, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/6d243dc0-cbef-4c44-bf71-5e33f689bcbe.jpg', category: 'vines', occasion: 'home' },
    { id: 10, name: 'Циссус Железистоножковый', price: 2500, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/6d243dc0-cbef-4c44-bf71-5e33f689bcbe.jpg', category: 'vines', occasion: 'office' },
    { id: 11, name: 'Лантана Красная', price: 2600, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/93b7ff8b-d740-4077-8959-3fe907ff6ec1.jpg', category: 'flowering', occasion: 'home', colors: ['#DC2626', '#F97316', '#FBBF24', '#A855F7', '#EC4899'] },
    { id: 12, name: 'Лантана Оранжевая', price: 2600, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/93b7ff8b-d740-4077-8959-3fe907ff6ec1.jpg', category: 'flowering', occasion: 'home', colors: ['#DC2626', '#F97316', '#FBBF24', '#A855F7', '#EC4899'] },
    { id: 13, name: 'Лантана Желтая', price: 2600, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/93b7ff8b-d740-4077-8959-3fe907ff6ec1.jpg', category: 'flowering', occasion: 'home', colors: ['#DC2626', '#F97316', '#FBBF24', '#A855F7', '#EC4899'] },
    { id: 14, name: 'Лантана Фиолетовая', price: 2600, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/93b7ff8b-d740-4077-8959-3fe907ff6ec1.jpg', category: 'flowering', occasion: 'home', colors: ['#DC2626', '#F97316', '#FBBF24', '#A855F7', '#EC4899'] },
    { id: 15, name: 'Лантана Розовая', price: 2600, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/93b7ff8b-d740-4077-8959-3fe907ff6ec1.jpg', category: 'flowering', occasion: 'home', colors: ['#DC2626', '#F97316', '#FBBF24', '#A855F7', '#EC4899'] },
    { id: 16, name: 'Клеродендрум Альбомаргината', price: 3400, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/2dfa965e-f005-40fc-b698-5063348d538e.jpg', category: 'flowering', occasion: 'home', colors: ['#FFFFFF', '#86EFAC', '#60A5FA'] },
    { id: 17, name: 'Клеродендрум Томсона', price: 3400, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/2dfa965e-f005-40fc-b698-5063348d538e.jpg', category: 'flowering', occasion: 'home', colors: ['#FFFFFF', '#86EFAC', '#60A5FA'] },
    { id: 18, name: 'Клеродендрум Голубой', price: 3400, image: 'https://cdn.poehali.dev/projects/ef8f277e-3687-405e-91a1-9f26682c83d0/files/2dfa965e-f005-40fc-b698-5063348d538e.jpg', category: 'flowering', occasion: 'home', colors: ['#FFFFFF', '#86EFAC', '#60A5FA'] },
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

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const loyaltyLevel = loyaltyPoints >= 5000 ? 'Золотой' : loyaltyPoints >= 2500 ? 'Серебряный' : 'Бронзовый';
  const nextLevelPoints = loyaltyPoints >= 5000 ? 0 : loyaltyPoints >= 2500 ? 5000 - loyaltyPoints : 2500 - loyaltyPoints;
  const progressToNextLevel = loyaltyPoints >= 5000 ? 100 : loyaltyPoints >= 2500 ? ((loyaltyPoints - 2500) / 2500) * 100 : (loyaltyPoints / 2500) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
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
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              title={isDarkMode ? 'Светлая тема' : 'Темная тема'}
            >
              <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={20} />
            </Button>
            
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
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="loyalty">Лояльность</TabsTrigger>
                    <TabsTrigger value="favorites">Избранное</TabsTrigger>
                    <TabsTrigger value="profile">Профиль</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="loyalty" className="space-y-6">
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/10 p-6 rounded-lg shadow-inner">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Ваш статус</span>
                          <Badge variant="secondary">{loyaltyLevel}</Badge>
                        </div>
                        <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">{loyaltyPoints} баллов</div>
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

                  <TabsContent value="favorites" className="space-y-4">
                    {favoriteProducts.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Icon name="Heart" size={48} className="mx-auto mb-4 opacity-30" />
                        <p>Вы пока ничего не добавили в избранное</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {favoriteProducts.map(product => (
                          <div key={product.id} className="flex gap-4 pb-4 border-b">
                            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                            <div className="flex-1">
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">{product.price} ₽</p>
                              <Button
                                size="sm"
                                className="mt-2"
                                onClick={() => {
                                  addToCart(product);
                                  setShowCart(true);
                                }}
                              >
                                <Icon name="ShoppingCart" size={14} className="mr-1" />
                                В корзину
                              </Button>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleFavorite(product.id)}
                            >
                              <Icon name="Heart" size={18} className="fill-current text-primary" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 pointer-events-none" />
        <div className="container px-4 relative z-10">
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
            <Card className="text-center hover-scale border-0 bg-gradient-to-br from-card via-card to-primary/5 shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center shadow-inner">
                  <Icon name="Flower" size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Свежие цветы</h3>
                <p className="text-sm text-muted-foreground">Ежедневные поставки от лучших производителей</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-scale border-0 bg-gradient-to-br from-card via-card to-secondary/10 shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-full flex items-center justify-center shadow-inner">
                  <Icon name="Truck" size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Быстрая доставка</h3>
                <p className="text-sm text-muted-foreground">Бесплатная доставка при заказе от 3000 ₽</p>
              </CardContent>
            </Card>

            <Card className="text-center hover-scale border-0 bg-gradient-to-br from-card via-card to-accent/10 shadow-lg">
              <CardContent className="pt-6 space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent/50 to-accent/20 rounded-full flex items-center justify-center shadow-inner">
                  <Icon name="Gift" size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Подарок в каждый заказ</h3>
                <p className="text-sm text-muted-foreground">Приятные сюрпризы для наших клиентов</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-muted/10 to-transparent pointer-events-none" />
        <div className="container px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">Каталог цветов</h2>

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
                    <SelectItem value="flowering">Цветущие</SelectItem>
                    <SelectItem value="foliage">Декоративно-лиственные</SelectItem>
                    <SelectItem value="vines">Лианы</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Назначение</Label>
                <Select value={selectedOccasion} onValueChange={setSelectedOccasion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все поводы" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все назначения</SelectItem>
                    <SelectItem value="home">Для дома</SelectItem>
                    <SelectItem value="office">Для офиса</SelectItem>
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
              <Card key={product.id} className="overflow-hidden hover-scale group border-0 bg-gradient-to-br from-card to-card/80 shadow-md hover:shadow-xl transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-lg flex-1">{product.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 -mt-1"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Icon 
                        name="Heart" 
                        size={20} 
                        className={favorites.includes(product.id) ? 'fill-current text-primary' : ''}
                      />
                    </Button>
                  </div>
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-3 py-2 rounded-lg inline-block mb-2">
                    <p className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">{product.price} ₽</p>
                  </div>
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {product.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-6 h-6 rounded-full border-2 border-border cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                          title={`Цвет ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
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

      <footer className="border-t py-12 mt-16 bg-gradient-to-br from-muted/10 to-transparent">
        <div className="container px-4 relative z-10">
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