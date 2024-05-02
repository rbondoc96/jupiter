use crate::utilities::arithmetic::{ArithmeticError, ArithmeticResult};
use crate::utilities::arithmetic::base;

#[derive(Clone, Debug)]
pub struct Number<N>(pub N);

impl Into<Number<f32>> for f32 {
    fn into(self) -> Number<f32> {
        Number(self)
    }
}

impl Number<f32> {
    // pub fn as_u32(&self) -> ArithmeticResult<u32> {
    //     let rounded = self.0.ceil();
    //     if rounded > (u32::MAX as f32) {
    //         return Err(ArithmeticError::ArithmeticOverflow);
    //     }
    //
    //     Ok(Number(rounded as u32))
    // }
    //
    // pub fn as_u64(&self) -> ArithmeticResult<u64> {
    //     let rounded = self.0.ceil();
    //     if rounded > (u64::MAX as f32) {
    //         return Err(ArithmeticError::ArithmeticOverflow);
    //     }
    //
    //     Ok(Number(rounded as u64))
    // }

    pub fn add_f32(&self, addend: f32) -> ArithmeticResult<f32> {
        base::add_f32s(self.0, addend)
    }

    // pub fn add_u32(&self, addend: u32) -> ArithmeticResult<f32> {
    //     base::add_f32s(self.0, f32::from(addend))
    // }
    //
    // pub fn add_u64(&self, addend: u64) -> ArithmeticResult<f32> {
    //     base::add_f32s(self.0, addend as f32)
    // }

    pub fn divide_f32(&self, denominator: f32) -> ArithmeticResult<f32> {
        base::divide_f32s(self.0, denominator)
    }

    pub fn divide_u32(&self, denominator: u32) -> ArithmeticResult<f32> {
        if denominator > (f32::MAX as u32) {
            return Err(ArithmeticError::ArithmeticOverflow);
        }

        base::divide_f32s(self.0, denominator as f32)
    }
    //
    // pub fn divide_u64(&self, denominator: u64) -> ArithmeticResult<f32> {
    //     base::divide_f32s(self.0, denominator as f32)
    // }

    pub fn multiply_f32(&self, multiplier: f32) -> ArithmeticResult<f32> {
        base::multiply_f32s(self.0, multiplier)
    }

    pub fn multiply_u32(&self, multiplier: u32) -> ArithmeticResult<f32> {
        if multiplier > (f32::MAX as u32) {
            return Err(ArithmeticError::ArithmeticOverflow);
        }

        base::multiply_f32s(self.0, multiplier as f32)
    }
    //
    // pub fn multiply_u64(&self, multiplier: u64) -> ArithmeticResult<f32> {
    //     base::multiply_f32s(self.0, multiplier as f32)
    // }

    pub fn subtract_f32(&self, subtrahend: f32) -> ArithmeticResult<f32> {
        base::validate_f32(self.0 - subtrahend)
    }

    // pub fn subtract_u32(&self, subtrahend: u32) -> ArithmeticResult<f32> {
    //     base::validate_f32(self.0 - f32::from(subtrahend))
    // }
    //
    // pub fn subtract_u64(&self, subtrahend: u64) -> ArithmeticResult<f32> {
    //     base::validate_f32(self.0 - (subtrahend as f32))
    // }
}

// impl Number<u32> {
//     pub fn as_f32(&self) -> ArithmeticResult<f32> {
//         Ok(Number(f32::from(self.0)))
//     }
//
//     pub fn as_u64(&self) -> ArithmeticResult<u64> {
//         Ok(Number(self.0 as u64))
//     }
//
//     pub fn add_f32(&self, addend: f32) -> ArithmeticResult<f32> {
//         base::add_f32(f32::from(self.0), addend)
//     }
//
//     pub fn add_u32(&self, addend: u32) -> ArithmeticResult<u64> {
//         base::add_u32(self.0, addend)
//     }
//
//     pub fn add_u64(&self, addend: u64) -> ArithmeticResult<u64> {
//         base::add_u64(self.0 as u64, addend)
//     }
//
//     pub fn divide_f32(&self, denominator: f32) -> ArithmeticResult<f32> {
//         base::divide_f32(f32::from(self.0), denominator)
//     }
//
//     pub fn divide_u32(&self, denominator: u32) -> ArithmeticResult<u64> {
//         base::divide_u32(self.0, denominator)
//     }
//
//     pub fn divide_u64(&self, denominator: u64) -> ArithmeticResult<u64> {
//         base::divide_u64(self.0 as u64, denominator)
//     }
//
//     pub fn multiply_f32(&self, multiplier: f32) -> ArithmeticResult<f32> {
//         base::multiply_f32(f32::from(self.0), multiplier)
//     }
//
//     pub fn multiply_u32(&self, multiplier: u32) -> ArithmeticResult<u64> {
//         base::multiply_u32(self.0, multiplier)
//     }
//
//     pub fn multiply_u64(&self, multiplier: u64) -> ArithmeticResult<u64> {
//         base::multiply_u64(self.0 as u64, multiplier)
//     }
//
//     pub fn subtract_f32(&self, subtrahend: f32) -> ArithmeticResult<f32> {
//         base::subtract_f32(f32::from(self.0), subtrahend)
//     }
//
//     pub fn subtract_u32(&self, subtrahend: u32) -> ArithmeticResult<i64> {
//         base::subtract_u32(self.0, subtrahend)
//     }
//
//     pub fn subtract_u64(&self, subtrahend: u64) -> ArithmeticResult<i64> {
//         base::subtract_u64(self.0 as u64, subtrahend)
//     }
// }
//
// impl Number<u64> {
//     pub fn as_f32(&self) -> ArithmeticResult<f32> {
//         Ok(Number(self.0 as f32))
//     }
//
//     pub fn as_u32(&self) -> ArithmeticResult<u32> {
//         if self.0 > (u32::MAX as u64) {
//             return Err(ArithmeticError::ArithmeticOverflow);
//         }
//
//         Ok(Number(self.0 as u32))
//     }
//
//     pub fn add_f32(&self, addend: f32) -> ArithmeticResult<f32> {
//         base::add_f32(self.0 as f32, addend)
//     }
//
//     pub fn add_u32(&self, addend: u32) -> ArithmeticResult<u64> {
//         base::add_u64(self.0, addend as u64)
//     }
//
//     pub fn add_u64(&self, addend: u64) -> ArithmeticResult<u64> {
//         base::add_u64(self.0, addend)
//     }
//
//     pub fn divide_f32(&self, denominator: f32) -> ArithmeticResult<f32> {
//         base::divide_f32(self.0 as f32, denominator)
//     }
//
//     pub fn divide_u32(&self, denominator: u32) -> ArithmeticResult<u64> {
//         base::divide_u64(self.0, denominator as u64)
//     }
//
//     pub fn multiply_f32(&self, multiplier: f32) -> ArithmeticResult<f32> {
//         base::multiply_f32(self.0 as f32, multiplier)
//     }
//
//     pub fn multiply_u32(&self, multiplier: u32) -> ArithmeticResult<u64> {
//         base::multiply_u64(self.0, multiplier as u64)
//     }
//
//     pub fn subtract_f32(&self, subtrahend: f32) -> ArithmeticResult<f32> {
//         base::subtract_f32(self.0 as f32, subtrahend)
//     }
//
//     pub fn subtract_u32(&self, subtrahend: u32) -> ArithmeticResult<i64> {
//         base::subtract_u64(self.0, subtrahend as u64)
//     }
//
//     pub fn subtract_u64(&self, subtrahend: u64) -> ArithmeticResult<i64> {
//         base::subtract_u64(self.0, subtrahend)
//     }
// }

// impl Into<Number<u32>> for u32 {
//     fn into(self) -> Number<u32> {
//         Number(self)
//     }
// }
//
// impl Into<Number<u64>> for u64 {
//     fn into(self) -> Number<u64> {
//         Number(self)
//     }
// }
