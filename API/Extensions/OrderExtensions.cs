using API.DTOs;
using API.Entities.OrderAggregate;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class OrderExtensions
{
    public static IQueryable<OrderDto> ProjectOrderToOrderDto(this IQueryable<Order> queryable)
    {
        return queryable
            .Select(order => new OrderDto
            {
                Id = order.Id,
                BuyerId = order.BuyerId,
                ShippingAddress = order.ShippingAddress,
                OrderDate = order.OrderDate,
                Subtotal = order.Subtotal,
                DeliveryFee = order.DeliveryFee,
                OrderStatus = order.OrderStatus.ToString(),
                Total = order.GetTotal(),
                OrderItems = order.OrderItems.Select(item => new OrderItemDto
                {
                    ProductId = item.ItemOrdered.ProductId,
                    Name = item.ItemOrdered.Name,
                    PictureUrl = item.ItemOrdered.PictureUrl,
                    Price = item.Price,
                    Quantity = item.Quantity
                }).ToList()
            }).AsNoTracking();
    }
}